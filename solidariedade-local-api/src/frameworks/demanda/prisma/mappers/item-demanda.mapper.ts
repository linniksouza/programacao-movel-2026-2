import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { ItemDemandaDoacao } from "@/dominio/demanda/entidades/item-demanda.entity";
import { IdItemDemandaDoacao } from "@/dominio/demanda/identificadores/id-item-demanda.identity";
import { PrismaItemDemandaDoacao } from "@/frameworks/instituicao/prisma/entidades";

class ItemDemandaDoacaoMapper extends ObjectMapper<PrismaItemDemandaDoacao, ItemDemandaDoacao> {

    public async mapear(entity: PrismaItemDemandaDoacao): Promise<ItemDemandaDoacao> {
        return new ItemDemandaDoacao({
            id: IdItemDemandaDoacao.instanciar({ valor: entity.id }),
            nome: entity.nome,
            unidadeMedida: entity.unidadeMedida,
            quantidadeMaxima: entity.quantidadeMaxima!
        });
    }
}

export { ItemDemandaDoacaoMapper };
