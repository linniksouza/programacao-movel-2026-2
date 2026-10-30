import { DateTime } from "luxon";

import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { DemandaDoacaoDTO } from "@/aplicacao/demanda/dto/demanda.dto";
import { NovaDemandaDoacaoDTO, NovoItemDemandaDoacaoDTO } from "@/aplicacao/demanda/dto/nova-demanda.dto";
import { IdFactory } from "@/dominio/abstracoes/base.identity";
import { DemandaDoacao } from "@/dominio/demanda/agregados/demanda.aggregate";
import { ItemDemandaDoacaoCollection } from "@/dominio/demanda/colecoes/item-demanda.collection";
import { ItemDemandaDoacao } from "@/dominio/demanda/entidades/item-demanda.entity";
import { StatusDemandaDoacao } from "@/dominio/demanda/enumeradores/status-demanda.enum";
import { IdDemandaDoacao } from "@/dominio/demanda/identificadores/id-demanda.identity";
import { IdItemDemandaDoacao } from "@/dominio/demanda/identificadores/id-item-demanda.identity";
import { DemandasDoacoesRepository } from "@/dominio/demanda/repositorios/demandas.repository";
import { InstituicaoNaoEncontradaException } from "@/dominio/instituicao/excecoes";
import { CnpjInstituicao } from "@/dominio/instituicao/identificadores/cnpj-instituicao.identity";
import { InstituicoesRepository } from "@/dominio/instituicao/repositorios/instituicoes.repository";

type NewCadastrarDemandaParams = {
    instituicoesRepository: InstituicoesRepository;
    demandasRepository: DemandasDoacoesRepository;
    idItemDemandaFactory: IdFactory<IdItemDemandaDoacao>;
    idDemandaFactory: IdFactory<IdDemandaDoacao>;
    demandaMapper: ObjectMapper<DemandaDoacao, DemandaDoacaoDTO>;
};
type CadastrarDemandaInput = {
    dto: NovaDemandaDoacaoDTO;
};
type CadastrarDemandaOutput = {
    dto: DemandaDoacaoDTO;
};

class CadastrarDemanda {

    private readonly _instituicoesRepository: InstituicoesRepository;

    private readonly _demandasRepository: DemandasDoacoesRepository;

    private readonly _idItemDemandaFactory: IdFactory<IdItemDemandaDoacao>;

    private readonly _idDemandaFactory: IdFactory<IdDemandaDoacao>;

    private readonly _demandaMapper: ObjectMapper<DemandaDoacao, DemandaDoacaoDTO>;

    public constructor(params: NewCadastrarDemandaParams) {
        this._instituicoesRepository = params.instituicoesRepository;
        this._demandasRepository = params.demandasRepository;
        this._idItemDemandaFactory = params.idItemDemandaFactory;
        this._idDemandaFactory = params.idDemandaFactory;
        this._demandaMapper = params.demandaMapper;
    }

    public async executar(input: CadastrarDemandaInput): Promise<CadastrarDemandaOutput> {
        const { dto } = input;

        const cnpjInstituicao = CnpjInstituicao.instanciar({ valor: dto.cnpj_instituicao });
        const instituicao = await this._instituicoesRepository.buscarInstituicao(cnpjInstituicao);
        if(!instituicao)
            throw new InstituicaoNaoEncontradaException(`Não foi encontrada uma instituição com CNPJ '${cnpjInstituicao.valor}'`);

        const demanda = new DemandaDoacao({
            id: await this._idDemandaFactory.gerar(),
            necessidades: dto.necessidades,
            status: StatusDemandaDoacao.ATIVADA,
            dataPostagem: DateTime.now().setZone("America/Manaus"),
            itens: await this.prepararItensDemandaDoacao(dto.itens),
            instituicao: instituicao
        });
        await this._demandasRepository.salvarDemanda(demanda);

        return {
            dto: await this._demandaMapper.mapear(demanda)
        };
    }

    public async prepararItensDemandaDoacao(itens: NovoItemDemandaDoacaoDTO[]): Promise<ItemDemandaDoacaoCollection> {
        const collection = new ItemDemandaDoacaoCollection();

        for(const dto of itens){
            const entity = new ItemDemandaDoacao({
                id: await this._idItemDemandaFactory.gerar(),
                nome: dto.nome,
                unidadeMedida: dto.unidade_medida,
                quantidadeMaxima: dto.quantidade_maxima!
            });
            collection.adicionar(entity);
        }

        return collection;
    }
}

export { CadastrarDemanda };
