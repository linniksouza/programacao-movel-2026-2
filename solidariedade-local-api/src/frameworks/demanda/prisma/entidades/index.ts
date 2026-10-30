import { DemandaDoacaoModel, ItemDemandaDoacaoModel } from "@/frameworks/comum/prismaclient/models";
import { PrismaInstituicao } from "@/frameworks/instituicao/prisma/entidades";

interface PrismaItemDemandaDoacao extends ItemDemandaDoacaoModel {}

interface PrismaDemandaDoacao extends DemandaDoacaoModel {
    itensDoacao: PrismaItemDemandaDoacao[];
    instituicao: PrismaInstituicao;
}

export {
    PrismaDemandaDoacao,
    PrismaItemDemandaDoacao
};
