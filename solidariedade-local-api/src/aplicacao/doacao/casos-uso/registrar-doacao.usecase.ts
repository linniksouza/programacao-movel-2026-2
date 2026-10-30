import { DateTime } from "luxon";

import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { DoacaoDTO } from "@/aplicacao/doacao/dto/doacao.dto";
import { NovaDoacaoDTO, NovoItemDoacaoDTO } from "@/aplicacao/doacao/dto/nova-doacao.dto";
import { IdFactory } from "@/dominio/abstracoes/base.identity";
import { DemandaNaoEncontradaException } from "@/dominio/demanda/excecoes";
import { IdDemandaDoacao } from "@/dominio/demanda/identificadores/id-demanda.identity";
import { DemandasDoacoesRepository } from "@/dominio/demanda/repositorios/demandas.repository";
import { Doacao } from "@/dominio/doacao/agregados/doacao.aggregate";
import { ItemDoacaoCollection } from "@/dominio/doacao/colecoes/item-doacao.collection";
import { ItemDoacao } from "@/dominio/doacao/entidades/item-doacao.entity";
import { StatusDoacao } from "@/dominio/doacao/enumeradores/status-doacao.enum";
import { IdDoacao } from "@/dominio/doacao/identificadores/id-doacao.identity";
import { IdItemDoacao } from "@/dominio/doacao/identificadores/id-item-doacao.identity";
import { DoacoesRepository } from "@/dominio/doacao/repositorios/doacoes.repository";
import { DoadorNaoEncontradoException } from "@/dominio/doador/excecoes";
import { CpfDoador } from "@/dominio/doador/identificadores/cpf-doador.identity";
import { DoadoresRepository } from "@/dominio/doador/repositorios/doadores.repository";

type NewRegistrarDoacaoParams = {
    doadoresRepository: DoadoresRepository;
    demandasRepository: DemandasDoacoesRepository;
    doacoesRepository: DoacoesRepository;
    idItemDoacaoFactory: IdFactory<IdItemDoacao>;
    idDoacaoFactory: IdFactory<IdDoacao>;
    doacaoMapper: ObjectMapper<Doacao, DoacaoDTO>;
};
type RegistrarDoacaoInput = {
    dto: NovaDoacaoDTO;
};
type RegistrarDoacaoOutput = {
    dto: DoacaoDTO;
};

class RegistrarDoacao {

    private readonly _doadoresRepository: DoadoresRepository;

    private readonly _demandasRepository: DemandasDoacoesRepository;

    private readonly _doacoesRepository: DoacoesRepository;

    private readonly _idItemDoacaoFactory: IdFactory<IdItemDoacao>;

    private readonly _idDoacaoFactory: IdFactory<IdDoacao>;

    private readonly _doacaoMapper: ObjectMapper<Doacao, DoacaoDTO>;

    public constructor(params: NewRegistrarDoacaoParams) {
        this._doadoresRepository = params.doadoresRepository;
        this._demandasRepository = params.demandasRepository;
        this._doacoesRepository = params.doacoesRepository;
        this._idItemDoacaoFactory = params.idItemDoacaoFactory;
        this._idDoacaoFactory = params.idDoacaoFactory;
        this._doacaoMapper = params.doacaoMapper;
    }

    public async executar(input: RegistrarDoacaoInput): Promise<RegistrarDoacaoOutput> {
        const { dto } = input;

        const cpfDoador = CpfDoador.instanciar({ valor: dto.cpf_doador });
        const doador = await this._doadoresRepository.buscarDoador(cpfDoador);
        if(!doador)
            throw new DoadorNaoEncontradoException(`Não foi encontrado um doador com CPF '${cpfDoador.valor}'`);

        const idDemanda = IdDemandaDoacao.instanciar({ valor: dto.id_demanda });
        const demanda = await this._demandasRepository.buscarDemanda(idDemanda);
        if(!demanda)
            throw new DemandaNaoEncontradaException(`Não foi encontrada uma demanda de doação com ID '${idDemanda.valor}'`);

        const doacao = new Doacao({
            id: await this._idDoacaoFactory.gerar(),
            statusDoacao: StatusDoacao.PENDENTE,
            dataHoraDoacao: DateTime.now().setZone("America/Manaus"),
            observacoes: dto.observacoes!,
            itens: await this.prepararItensDoacao(dto.itens),
            doador: doador,
            demanda: demanda
        });
        await this._doacoesRepository.salvarDoacao(doacao);

        return {
            dto: await this._doacaoMapper.mapear(doacao)
        };
    }

    private async prepararItensDoacao(itens: NovoItemDoacaoDTO[]): Promise<ItemDoacaoCollection> {
        const collection = new ItemDoacaoCollection();

        for(const dto of itens){
            const entity = new ItemDoacao({
                id: await this._idItemDoacaoFactory.gerar(),
                nome: dto.nome,
                unidadeMedida: dto.unidade_medida,
                quantidade: dto.quantidade
            });
            collection.adicionar(entity);
        }

        return collection;
    }
}

export { RegistrarDoacao };
