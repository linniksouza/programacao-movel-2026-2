import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { Doador } from "@/dominio/doador/entidades/doador.entity";
import { OrigemContaDoador } from "@/dominio/doador/enumeradores/origem-conta.enum";
import { CpfDoador } from "@/dominio/doador/identificadores/cpf-doador.identity";
import { PrismaDoador } from "@/frameworks/doador/prisma/entidades";

class DoadorMapper extends ObjectMapper<PrismaDoador, Doador> {

    public async mapear(entity: PrismaDoador): Promise<Doador> {
        return new Doador({
            cpf: CpfDoador.instanciar({ valor: entity.cpf }),
            nome: entity.nome,
            email: entity.email,
            origemConta: entity.origemConta as OrigemContaDoador,
            urlImagem: entity.urlImagem!
        });
    }
}

export { DoadorMapper };
