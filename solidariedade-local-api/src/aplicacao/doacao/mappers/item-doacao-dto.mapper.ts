import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { ItemDoacaoDTO } from "@/aplicacao/doacao/dto/doacao.dto";
import { ItemDoacao } from "@/dominio/doacao/entidades/item-doacao.entity";

class ItemDoacaoDTOMapper extends ObjectMapper<ItemDoacao, ItemDoacaoDTO> {

    public async mapear(entity: ItemDoacao): Promise<ItemDoacaoDTO> {
        return {
            id: entity.id.valor,
            nome: entity.nome,
            unidade_medida: entity.unidadeMedida,
            quantidade: entity.quantidade
        };
    }
}

export { ItemDoacaoDTOMapper };
