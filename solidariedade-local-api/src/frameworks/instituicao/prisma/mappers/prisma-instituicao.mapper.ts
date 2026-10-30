import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { Instituicao } from "@/dominio/instituicao/entidades/instituicao.entity";
import { PrismaInstituicao } from "@/frameworks/instituicao/prisma/entidades";

class PrismaInstituicaoMapper extends ObjectMapper<Instituicao, PrismaInstituicao> {

    public async mapear(entity: Instituicao): Promise<PrismaInstituicao> {
        return {
            cnpj: entity.cnpj.valor,
            nome: entity.nome,
            biografia: entity.biografia,
            localizacao: entity.localizacao,
            areasAtuacao: entity.areasAtuacao,
            enderecoSite: entity.enderecoSite,
            imagemPrincipal: entity.imagemPrincipal,
            imagemCapa: entity.imagemCapa!
        };
    }
}

export { PrismaInstituicaoMapper };
