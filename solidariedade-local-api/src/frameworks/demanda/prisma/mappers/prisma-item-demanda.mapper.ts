import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { ItemDemandaDoacao } from "@/dominio/demanda/entidades/item-demanda.entity";
import { IdDemandaDoacao } from "@/dominio/demanda/identificadores/id-demanda.identity";
import { PrismaItemDemandaDoacao } from "@/frameworks/instituicao/prisma/entidades";

class PrismaItemDemandaDoacaoMapper extends ObjectMapper<[ItemDemandaDoacao, IdDemandaDoacao], PrismaItemDemandaDoacao> {

    public async mapear(origem: [ItemDemandaDoacao, IdDemandaDoacao]): Promise<PrismaItemDemandaDoacao> {
        const [entity, idDemanda] = origem;

        return {
            id: entity.id.valor,
            nome: entity.nome,
            unidadeMedida: entity.unidadeMedida,
            quantidadeMaxima: entity.quantidadeMaxima!,
            idDemanda: idDemanda.valor
        };
    }
}

export { PrismaItemDemandaDoacaoMapper };
