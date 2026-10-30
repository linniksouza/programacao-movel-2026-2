import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { DemandaDoacao } from "@/dominio/demanda/agregados/demanda.aggregate";
import { DemandaDoacaoModel } from "@/frameworks/comum/prismaclient/models";

class PrismaDemandaDoacaoMapper extends ObjectMapper<DemandaDoacao, DemandaDoacaoModel> {

    public async mapear(entity: DemandaDoacao): Promise<DemandaDoacaoModel> {
        return {
            id: entity.id.valor,
            necessidades: entity.necessidades,
            status: entity.status,
            dataPostagem: entity.dataPostagem.toJSDate(),
            cnpjInstituicao: entity.instituicao.cnpj.valor
        };
    }
}

export { PrismaDemandaDoacaoMapper };
