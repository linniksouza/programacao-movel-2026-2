import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { DemandaDoacao } from "@/dominio/demanda/agregados/demanda.aggregate";
import { ItemDemandaDoacao } from "@/dominio/demanda/entidades/item-demanda.entity";
import { StatusDemandaDoacao } from "@/dominio/demanda/enumeradores/status-demanda.enum";
import { IdDemandaDoacao } from "@/dominio/demanda/identificadores/id-demanda.identity";
import { DemandasDoacoesRepository } from "@/dominio/demanda/repositorios/demandas.repository";
import { PrismaClient } from "@/frameworks/comum/prismaclient/client";
import { DemandaDoacaoModel } from "@/frameworks/comum/prismaclient/models";
import { PrismaDemandaDoacao, PrismaItemDemandaDoacao } from "@/frameworks/demanda/prisma/entidades";

type NewPrismaDemandasDoacoesRepositoryParams = {
    conexao: PrismaClient;
    demandaMapper: ObjectMapper<PrismaDemandaDoacao, DemandaDoacao>;
    prismaDemandaMapper: ObjectMapper<DemandaDoacao, DemandaDoacaoModel>;
    prismaItemDemandaMapper: ObjectMapper<[ItemDemandaDoacao, IdDemandaDoacao], PrismaItemDemandaDoacao>;
};

class PrismaDemandasDoacoesRepository implements DemandasDoacoesRepository {

    private readonly _conexao: PrismaClient;

    private readonly _demandaMapper: ObjectMapper<PrismaDemandaDoacao, DemandaDoacao>;

    private readonly _prismaDemandaMapper: ObjectMapper<DemandaDoacao, DemandaDoacaoModel>;

    private readonly _prismaItemDemandaMapper: ObjectMapper<[ItemDemandaDoacao, IdDemandaDoacao], PrismaItemDemandaDoacao>;

    public constructor(params: NewPrismaDemandasDoacoesRepositoryParams) {
        this._conexao = params.conexao;
        this._demandaMapper = params.demandaMapper;
        this._prismaDemandaMapper = params.prismaDemandaMapper;
        this._prismaItemDemandaMapper = params.prismaItemDemandaMapper;
    }

    public async buscarDemandas(): Promise<DemandaDoacao[]> {
        const entities = await this._conexao.demandaDoacao.findMany({
            where: {
                status: StatusDemandaDoacao.ATIVADA
            },
            orderBy: {
                dataPostagem: "desc"
            },
            include: {
                itensDoacao: true,
                instituicao: true
            }
        });

        return await this._demandaMapper.mapearLista(entities);
    }

    public async buscarDemanda(id: IdDemandaDoacao): Promise<DemandaDoacao | undefined> {
        const entity = await this._conexao.demandaDoacao.findFirst({
            where: {
                id: id.valor
            },
            include: {
                itensDoacao: true,
                instituicao: true
            }
        });

        if(entity)
            return await this._demandaMapper.mapear(entity);
    }

    public async salvarDemanda(demanda: DemandaDoacao): Promise<boolean> {
        const entity = await this._prismaDemandaMapper.mapear(demanda);
        const demandaSaved = await this._conexao.demandaDoacao.upsert({
            create: { ...entity },
            update: { ...entity },
            where: {
                id: entity.id
            }
        });

        const itensDemandaEntities = (
            await this._prismaItemDemandaMapper
                .mapearLista(
                    ([...demanda.itens].map((item) => [item, demanda.id])))
                );
        const itensDemandaSaved = await this._conexao.itemDemandaDoacao.createMany({
            data: itensDemandaEntities,
        });

        return (!!demandaSaved) && (!!itensDemandaSaved);
    }
}

export { PrismaDemandasDoacoesRepository };
