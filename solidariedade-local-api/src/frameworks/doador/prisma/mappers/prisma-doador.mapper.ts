import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { Doador } from "@/dominio/doador/entidades/doador.entity";
import { PrismaDoador } from "@/frameworks/doador/prisma/entidades";

class PrismaDoadorMapper extends ObjectMapper<Doador, PrismaDoador> {

    public async mapear(entity: Doador): Promise<PrismaDoador> {
        return {
            cpf: entity.cpf.valor,
            nome: entity.nome,
            email: entity.email,
            origemConta: entity.origemConta,
            urlImagem: entity.urlImagem!
        };
    }
}

export { PrismaDoadorMapper };
