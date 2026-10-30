import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { Instituicao } from "@/dominio/instituicao/entidades/instituicao.entity";
import { CnpjInstituicao } from "@/dominio/instituicao/identificadores/cnpj-instituicao.identity";
import { InstituicoesRepository } from "@/dominio/instituicao/repositorios/instituicoes.repository";
import { PrismaClient } from "@/frameworks/comum/prismaclient/client";
import { PrismaInstituicao } from "@/frameworks/instituicao/prisma/entidades";

type NewPrismaInstituicoesRepositoryParams = {
    conexao: PrismaClient;
    instituicaoMapper: ObjectMapper<PrismaInstituicao, Instituicao>;
    prismaInstituicaoMapper: ObjectMapper<Instituicao, PrismaInstituicao>;
};

class PrismaInstituicoesRepository implements InstituicoesRepository {

    private readonly _conexao: PrismaClient;

    private readonly _instituicaoMapper: ObjectMapper<PrismaInstituicao, Instituicao>;

    private readonly _prismaInstituicaoMapper: ObjectMapper<Instituicao, PrismaInstituicao>;

    public constructor(params: NewPrismaInstituicoesRepositoryParams) {
        this._conexao = params.conexao;
        this._instituicaoMapper = params.instituicaoMapper;
        this._prismaInstituicaoMapper = params.prismaInstituicaoMapper;
    }

    public async buscarInstituicoes(): Promise<Instituicao[]> {
        const entities = await this._conexao.instituicao.findMany();

        return await this._instituicaoMapper.mapearLista(entities);
    }

    public async buscarInstituicao(cnpj: CnpjInstituicao): Promise<Instituicao | undefined> {
        const entity = await this._conexao.instituicao.findFirst({
            where: {
                cnpj: cnpj.valor
            }
        });

        if(entity)
            return this._instituicaoMapper.mapear(entity);
    }

    public async salvarInstituicao(instituicao: Instituicao): Promise<boolean> {
        const entity = await this._prismaInstituicaoMapper.mapear(instituicao);
        const saved = await this._conexao.instituicao.upsert({
            create: {
                ...entity,
                areasAtuacao: [
                    ...(entity.areasAtuacao  as string[])
                ]
            },
            update: {
                ...entity,
                areasAtuacao: [
                    ...(entity.areasAtuacao  as string[])
                ]
            },
            where: {
                cnpj: entity.cnpj
            }
        });

        return !!saved;
    }
}

export { PrismaInstituicoesRepository };
