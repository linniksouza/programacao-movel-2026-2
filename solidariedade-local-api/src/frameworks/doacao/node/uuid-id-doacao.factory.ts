import { randomUUID } from "node:crypto";

import { IdFactory } from "@/dominio/abstracoes/base.identity";
import { IdDoacao } from "@/dominio/doacao/identificadores/id-doacao.identity";

class UUIDIdDoacaoFactory implements IdFactory<IdDoacao> {

    public async gerar(): Promise<IdDoacao> {
        return IdDoacao.instanciar({
            valor: randomUUID()
        });
    }
}

export { UUIDIdDoacaoFactory };
