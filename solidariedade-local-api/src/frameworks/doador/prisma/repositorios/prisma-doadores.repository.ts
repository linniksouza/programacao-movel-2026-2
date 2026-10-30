import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { Doador } from "@/dominio/doador/entidades/doador.entity";
import { CpfDoador } from "@/dominio/doador/identificadores/cpf-doador.identity";
import { DoadoresRepository } from "@/dominio/doador/repositorios/doadores.repository";
import { PrismaClient } from "@/frameworks/comum/prismaclient/client";
import { PrismaDoador } from "@/frameworks/doador/prisma/entidades";

type NewPrismaDoadoresRepositoryParams = {
    conexao: PrismaClient;
    entityMapper: ObjectMapper<PrismaDoador, Doador>;
    prismaMapper: ObjectMapper<Doador, PrismaDoador>;
};

class PrismaDoadoresRepository implements DoadoresRepository {

    private readonly _conexao: PrismaClient;

    private readonly _entityMapper: ObjectMapper<PrismaDoador, Doador>;

    private readonly _prismaMapper: ObjectMapper<Doador, PrismaDoador>;

    public constructor(params: NewPrismaDoadoresRepositoryParams) {
        this._conexao = params.conexao;
        this._entityMapper = params.entityMapper;
        this._prismaMapper = params.prismaMapper;
    }

    public async buscarDoador(key: CpfDoador | string): Promise<Doador | undefined> {
        const whereClause = (
            (key instanceof CpfDoador)
                ? { cpf: key.valor }
                : { email: key }
        );
        const entity = await this._conexao.doador.findFirst({
            where: { ...whereClause }
        });

        if(entity)
            return await this._entityMapper.mapear(entity);
    }

    public async salvarDoador(doador: Doador): Promise<boolean> {
        const entity = await this._prismaMapper.mapear(doador);
        const saved = await this._conexao.doador.upsert({
            create: { ...entity },
            update: { ...entity },
            where: {
                cpf: entity.cpf
            }
        });

        return !!saved;
    }
}

export { PrismaDoadoresRepository };
