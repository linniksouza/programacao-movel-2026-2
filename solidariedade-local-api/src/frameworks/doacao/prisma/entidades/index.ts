import { DoacaoFeitaModel, ItemDoacaoFeitaModel } from "@/frameworks/comum/prismaclient/models";
import { PrismaDoador } from "@/frameworks/doador/prisma/entidades";
import { PrismaDemandaDoacao } from "@/frameworks/instituicao/prisma/entidades";

interface PrismaItemDoacao extends ItemDoacaoFeitaModel {}

interface PrismaDoacao extends DoacaoFeitaModel {
    itensDoacao: PrismaItemDoacao[];
    doador: PrismaDoador;
    demanda: PrismaDemandaDoacao;
}

export {
    PrismaDoacao,
    PrismaItemDoacao
};
