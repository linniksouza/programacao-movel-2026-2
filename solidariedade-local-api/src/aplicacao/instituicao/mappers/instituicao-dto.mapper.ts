import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { Instituicao } from "@/dominio/instituicao/entidades/instituicao.entity";
import { InstituicaoDTO } from "@/aplicacao/instituicao/dto/instituicao.dto";

class InstituicaoDTOMapper extends ObjectMapper<Instituicao, InstituicaoDTO> {

    public async mapear(entity: Instituicao): Promise<InstituicaoDTO> {
        return {
            cnpj: entity.cnpj.valor,
            nome: entity.nome,
            biografia: entity.biografia,
            localizacao: entity.localizacao,
            areas_atuacao: entity.areasAtuacao,
            endereco_site: entity.enderecoSite,
            imagem_principal: entity.imagemPrincipal,
            imagem_capa: entity.imagemCapa
        };
    }
}

export { InstituicaoDTOMapper };
