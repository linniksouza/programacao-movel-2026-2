import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { Instituicao } from "@/dominio/instituicao/entidades/instituicao.entity";
import { CnpjInstituicao } from "@/dominio/instituicao/identificadores/cnpj-instituicao.identity";
import { PrismaInstituicao } from "@/frameworks/instituicao/prisma/entidades";

class InstituicaoMapper extends ObjectMapper<PrismaInstituicao, Instituicao> {

    public async mapear(entity: PrismaInstituicao): Promise<Instituicao> {
        return new Instituicao({
            cnpj: CnpjInstituicao.instanciar({ valor: entity.cnpj }),
            nome: entity.nome,
            biografia: entity.biografia,
            localizacao: entity.localizacao,
            areasAtuacao: entity.areasAtuacao as string[],
            enderecoSite: entity.enderecoSite,
            imagemPrincipal: entity.imagemPrincipal,
            imagemCapa: entity.imagemCapa!
        });
    }
}

export { InstituicaoMapper };
