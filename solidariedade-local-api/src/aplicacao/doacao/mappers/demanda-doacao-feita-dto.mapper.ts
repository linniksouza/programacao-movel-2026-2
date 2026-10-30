import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { DemandaDoacaoFeitaDTO } from "@/aplicacao/doacao/dto/doacao.dto";
import { DemandaDoacao } from "@/dominio/demanda/agregados/demanda.aggregate";

class DemandaDoacaoFeitaDTOMapper extends ObjectMapper<DemandaDoacao, DemandaDoacaoFeitaDTO> {

    public async mapear(entity: DemandaDoacao): Promise<DemandaDoacaoFeitaDTO> {
        return {
            id: entity.id.valor,
            necessidades: entity.necessidades,
            instituicao: entity.instituicao.nome,
            localizacao: entity.instituicao.localizacao,
            imagemInstituicao: entity.instituicao.imagemPrincipal
        };
    }
}

export { DemandaDoacaoFeitaDTOMapper };
