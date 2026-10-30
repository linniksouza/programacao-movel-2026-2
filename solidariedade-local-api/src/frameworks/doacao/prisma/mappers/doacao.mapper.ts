import { DateTime } from "luxon";

import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { Doacao } from "@/dominio/doacao/agregados/doacao.aggregate";
import { ItemDoacaoCollection } from "@/dominio/doacao/colecoes/item-doacao.collection";
import { Doador } from "@/dominio/doador/entidades/doador.entity";
import { ItemDoacao } from "@/dominio/doacao/entidades/item-doacao.entity";
import { StatusDoacao } from "@/dominio/doacao/enumeradores/status-doacao.enum";
import { IdDoacao } from "@/dominio/doacao/identificadores/id-doacao.identity";
import {
    PrismaDoacao,
    PrismaDoador,
    PrismaItemDoacao
} from "@/frameworks/doador/prisma/entidades";
import { PrismaDemandaDoacao } from "@/frameworks/instituicao/prisma/entidades";
import { DemandaDoacao } from "@/dominio/demanda/agregados/demanda.aggregate";

type NewDoacaoMapperParams = {
    itemMapper: ObjectMapper<PrismaItemDoacao, ItemDoacao>;
    doadorMapper: ObjectMapper<PrismaDoador, Doador>;
    demandaMapper: ObjectMapper<PrismaDemandaDoacao, DemandaDoacao>;
};

class DoacaoMapper extends ObjectMapper<PrismaDoacao, Doacao> {

    private readonly _itemMapper: ObjectMapper<PrismaItemDoacao, ItemDoacao>;

    private readonly _doadorMapper: ObjectMapper<PrismaDoador, Doador>;

    private readonly _demandaMapper: ObjectMapper<PrismaDemandaDoacao, DemandaDoacao>;

    public constructor(params: NewDoacaoMapperParams) {
        super();

        this._itemMapper = params.itemMapper;
        this._doadorMapper = params.doadorMapper;
        this._demandaMapper = params.demandaMapper;
    }

    public async mapear(entity: PrismaDoacao): Promise<Doacao> {
        const doador = await this._doadorMapper.mapear(entity.doador);
        const demanda = await this._demandaMapper.mapear(entity.demanda);
        const itensEntities = await this._itemMapper.mapearLista(entity.itens);
        const itens = new ItemDoacaoCollection();
        for(const entity of itensEntities){
            itens.adicionar(entity);
        }

        return new Doacao({
            id: IdDoacao.instanciar({ valor: entity.id }),
            statusDoacao: entity.statusDoacao as StatusDoacao,
            dataHoraDoacao: DateTime.fromJSDate(entity.dataHoraDoacao),
            observacoes: entity.observacoes!,
            itens: itens,
            doador: doador,
            demanda: demanda
        });
    }
}

export { DoacaoMapper };
