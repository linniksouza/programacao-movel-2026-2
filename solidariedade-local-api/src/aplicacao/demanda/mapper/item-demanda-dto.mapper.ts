import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { ItemDemandaDoacaoDTO } from "@/aplicacao/demanda/dto/demanda.dto";
import { ItemDemandaDoacao } from "@/dominio/demanda/entidades/item-demanda.entity";

class ItemDemandaDoacaoDTOMapper extends ObjectMapper<ItemDemandaDoacao, ItemDemandaDoacaoDTO> {

    public async mapear(entity: ItemDemandaDoacao): Promise<ItemDemandaDoacaoDTO> {
        return {
            id: entity.id.valor,
            nome: entity.nome,
            unidade_medida: entity.unidadeMedida,
            quantidade_maxima: entity.quantidadeMaxima!
        };
    }
}

export { ItemDemandaDoacaoDTOMapper };
