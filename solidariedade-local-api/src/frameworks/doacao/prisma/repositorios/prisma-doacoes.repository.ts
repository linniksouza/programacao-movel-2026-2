import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { Doacao } from "@/dominio/doacao/agregados/doacao.aggregate";
import { ItemDoacao } from "@/dominio/doacao/entidades/item-doacao.entity";
import { CpfDoador } from "@/dominio/doador/identificadores/cpf-doador.identity";
import { IdDoacao } from "@/dominio/doacao/identificadores/id-doacao.identity";
import { DoacoesRepository } from "@/dominio/doador/repositorios/doacoes.repository";
import { PrismaClient } from "@/frameworks/comum/prismaclient/client";
import { DoacaoFeitaModel } from "@/frameworks/comum/prismaclient/models";
import { PrismaDoacao, PrismaItemDoacao } from "@/frameworks/doador/prisma/entidades";

type NewPrismaDoacoesRepositoryParams = {
    conexao: PrismaClient;
    doacaoMapper: ObjectMapper<PrismaDoacao, Doacao>;
    prismaDoacaoMapper: ObjectMapper<Doacao, DoacaoFeitaModel>;
    prismaItemDoacaoMapper: ObjectMapper<[ItemDoacao, IdDoacao], PrismaItemDoacao>;
};

class PrismaDoacoesRepository implements DoacoesRepository {

    private readonly _conexao: PrismaClient;

    private readonly _doacaoMapper: ObjectMapper<PrismaDoacao, Doacao>;

    private readonly _prismaDoacaoMapper: ObjectMapper<Doacao, DoacaoFeitaModel>;

    private readonly _prismaItemDoacaoMapper: ObjectMapper<[ItemDoacao, IdDoacao], PrismaItemDoacao>;

    public constructor(params: NewPrismaDoacoesRepositoryParams) {
        this._conexao = params.conexao;
        this._doacaoMapper = params.doacaoMapper;
        this._prismaDoacaoMapper = params.prismaDoacaoMapper;
        this._prismaItemDoacaoMapper = params.prismaItemDoacaoMapper;
    }

    public async buscarDoacoes(cpfDoador: CpfDoador): Promise<Doacao[]> {
        const entities = await this._conexao.doacaoFeita.findMany({
            where: {
                doador: {
                    cpf: cpfDoador.valor
                }
            },
            include: {
                demanda: {
                    include: {
                        instituicao: true,
                        itensDoacao: true
                    }
                },
                itensDoacao: true,
                doador: true
            }
        });

        return await this._doacaoMapper.mapearLista(entities);
    }

    public async salvarDoacao(doacao: Doacao): Promise<boolean> {
        const entity = await this._prismaDoacaoMapper.mapear(doacao);
        const doacaoSaved = await this._conexao.doacaoFeita.upsert({
            create: { ...entity },
            update: { ...entity },
            where: {
                id: entity.id
            }
        });

        const itensDoacaoEntities = (
            await this._prismaItemDoacaoMapper.mapearLista(
                ([...doacao.itens].map((item) => [item, doacao.id]))
            )
        );
        const itensDoacaoSaved = await this._conexao.itemDoacaoFeita.createMany({
            data: itensDoacaoEntities
        });

        return (!!doacaoSaved) && (!!itensDoacaoSaved);
    }
}

export { PrismaDoacoesRepository };
