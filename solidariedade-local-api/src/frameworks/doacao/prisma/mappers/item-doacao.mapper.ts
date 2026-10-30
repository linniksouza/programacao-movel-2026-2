import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { PrismaItemDoacao } from "@/frameworks/doador/prisma/entidades";
import { ItemDoacao } from "@/dominio/doacao/entidades/item-doacao.entity";
import { IdItemDoacao } from "@/dominio/doacao/identificadores/id-item-doacao.identity";

class ItemDoacaoMapper extends ObjectMapper<PrismaItemDoacao, ItemDoacao> {

    public async mapear(entity: PrismaItemDoacao): Promise<ItemDoacao> {
        return new ItemDoacao({
            id: IdItemDoacao.instanciar({ valor: entity.id }),
            nome: entity.nome,
            unidadeMedida: entity.unidadeMedida,
            quantidade: entity.quantidade
        });
    }
}

export { ItemDoacaoMapper };
