import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { ItemDoacao } from "@/dominio/doacao/entidades/item-doacao.entity";
import { IdDoacao } from "@/dominio/doacao/identificadores/id-doacao.identity";
import { PrismaItemDoacao } from "@/frameworks/doador/prisma/entidades";

class PrismaItemDoacaoMapper extends ObjectMapper<[ItemDoacao, IdDoacao], PrismaItemDoacao> {

    public async mapear(origem: [ItemDoacao, IdDoacao]): Promise<PrismaItemDoacao> {
        const [entity, idDoacao] = origem;

        return {
            id: entity.id.valor,
            nome: entity.nome,
            unidadeMedida: entity.unidadeMedida,
            quantidade: entity.quantidade,
            idDoacao: idDoacao.valor
        };
    }
}

export { PrismaItemDoacaoMapper };
