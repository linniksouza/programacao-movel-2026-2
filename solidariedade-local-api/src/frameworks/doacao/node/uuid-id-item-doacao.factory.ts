import { randomUUID } from "node:crypto";

import { IdFactory } from "@/dominio/abstracoes/base.identity";
import { IdItemDoacao } from "@/dominio/doacao/identificadores/id-item-doacao.identity";

class UUIDIdItemDoacaoFactory implements IdFactory<IdItemDoacao> {

    public async gerar(): Promise<IdItemDoacao> {
        return IdItemDoacao.instanciar({
            valor: randomUUID()
        });
    }
}

export { UUIDIdItemDoacaoFactory };
