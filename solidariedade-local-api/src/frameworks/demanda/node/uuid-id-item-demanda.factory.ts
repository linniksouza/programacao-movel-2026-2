import { randomUUID } from "node:crypto";

import { IdFactory } from "@/dominio/abstracoes/base.identity";
import { IdItemDemandaDoacao } from "@/dominio/demanda/identificadores/id-item-demanda.identity";

class UUIDIdItemDemandaDoacaoFactory implements IdFactory<IdItemDemandaDoacao> {

    public async gerar(): Promise<IdItemDemandaDoacao> {
        return IdItemDemandaDoacao.instanciar({
            valor: randomUUID()
        });
    }
}

export { UUIDIdItemDemandaDoacaoFactory };
