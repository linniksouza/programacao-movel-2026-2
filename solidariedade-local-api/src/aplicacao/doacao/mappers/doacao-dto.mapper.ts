import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import {
    DemandaDoacaoFeitaDTO,
    DoacaoDTO,
    ItemDoacaoDTO
} from "@/aplicacao/doacao/dto/doacao.dto";
import { Doacao } from "@/dominio/doacao/agregados/doacao.aggregate";
import { ItemDoacao } from "@/dominio/doacao/entidades/item-doacao.entity";
import { DemandaDoacao } from "@/dominio/demanda/agregados/demanda.aggregate";

type NewDoacaoDTOMapperParams = {
    itemMapper: ObjectMapper<ItemDoacao, ItemDoacaoDTO>;
    demandaMapper: ObjectMapper<DemandaDoacao, DemandaDoacaoFeitaDTO>;
};

class DoacaoDTOMapper extends ObjectMapper<Doacao, DoacaoDTO> {

    private readonly _itemMapper: ObjectMapper<ItemDoacao, ItemDoacaoDTO>;

    private readonly _demandaMapper: ObjectMapper<DemandaDoacao, DemandaDoacaoFeitaDTO>;

    public constructor(params: NewDoacaoDTOMapperParams) {
        super();

        this._itemMapper = params.itemMapper;
        this._demandaMapper = params.demandaMapper;
    }

    public async mapear(entity: Doacao): Promise<DoacaoDTO> {
        return {
            id: entity.id.valor,
            status_doacao: entity.statusDoacao,
            observacoes: entity.observacoes!,
            data_hora_doacao: entity.dataHoraDoacao.toISO()!,
            itens: await this._itemMapper.mapearLista([...entity.itens]),
            demanda: await this._demandaMapper.mapear(entity.demanda)
        };
    }
}

export { DoacaoDTOMapper };

