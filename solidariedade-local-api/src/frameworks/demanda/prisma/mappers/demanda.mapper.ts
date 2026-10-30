import { DateTime } from "luxon";

import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { DemandaDoacao } from "@/dominio/demanda/agregados/demanda.aggregate";
import { ItemDemandaDoacaoCollection } from "@/dominio/demanda/colecoes/item-demanda.collection";
import { ItemDemandaDoacao } from "@/dominio/demanda/entidades/item-demanda.entity";
import { StatusDemandaDoacao } from "@/dominio/demanda/enumeradores/status-demanda.enum";
import { IdDemandaDoacao } from "@/dominio/demanda/identificadores/id-demanda.identity";
import { Instituicao } from "@/dominio/instituicao/entidades/instituicao.entity";
import { PrismaDemandaDoacao, PrismaItemDemandaDoacao } from "@/frameworks/demanda/prisma/entidades";
import { PrismaInstituicao } from "@/frameworks/instituicao/prisma/entidades";

type NewDemandaDoacaoMapperParams = {
    itensMapper: ObjectMapper<PrismaItemDemandaDoacao, ItemDemandaDoacao>;
    instituicaoMapper: ObjectMapper<PrismaInstituicao, Instituicao>;
};

class DemandaDoacaoMapper extends ObjectMapper<PrismaDemandaDoacao, DemandaDoacao> {

    private readonly _itensMapper: ObjectMapper<PrismaItemDemandaDoacao, ItemDemandaDoacao>;

    private readonly _instituicaoMapper: ObjectMapper<PrismaInstituicao, Instituicao>;

    public constructor(params: NewDemandaDoacaoMapperParams) {
        super();

        this._itensMapper = params.itensMapper;
        this._instituicaoMapper = params.instituicaoMapper;
    }

    public async mapear(entity: PrismaDemandaDoacao): Promise<DemandaDoacao> {
        const instituicao = await this._instituicaoMapper.mapear(entity.instituicao);
        const itensEntities = await this._itensMapper.mapearLista(entity.itensDoacao);
        const itensDemanda = new ItemDemandaDoacaoCollection();
        for(const entity of itensEntities){
            itensDemanda.adicionar(entity);
        }

        return new DemandaDoacao({
            id: IdDemandaDoacao.instanciar({ valor: entity.id }),
            necessidades: entity.necessidades,
            status: entity.status as StatusDemandaDoacao,
            dataPostagem: DateTime.fromJSDate(entity.dataPostagem).setZone("America/Manaus"),
            itens: itensDemanda,
            instituicao: instituicao
        });
    }
}

export { DemandaDoacaoMapper };

