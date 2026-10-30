import { randomUUID } from "node:crypto";

import { IdFactory } from "@/dominio/abstracoes/base.identity";
import { IdDemandaDoacao } from "@/dominio/demanda/identificadores/id-demanda.identity";

class UUIDIdDemandaDoacaoFactory implements IdFactory<IdDemandaDoacao> {

    public async gerar(): Promise<IdDemandaDoacao> {
        return IdDemandaDoacao.instanciar({
            valor: randomUUID()
        });
    }
}

export { UUIDIdDemandaDoacaoFactory };
