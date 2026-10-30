import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { DemandaDoacaoDTO, ItemDemandaDoacaoDTO } from "@/aplicacao/demanda/dto/demanda.dto";
import { InstituicaoDTO } from "@/aplicacao/instituicao/dto/instituicao.dto";
import { DemandaDoacao } from "@/dominio/demanda/agregados/demanda.aggregate";
import { Instituicao } from "@/dominio/instituicao/entidades/instituicao.entity";
import { ItemDemandaDoacao } from "@/dominio/demanda/entidades/item-demanda.entity";

type NewDemandaDoacaoDTOMapperParams = {
    itemMapper: ObjectMapper<ItemDemandaDoacao, ItemDemandaDoacaoDTO>;
    instituicaoMapper: ObjectMapper<Instituicao, InstituicaoDTO>;
};

class DemandaDoacaoDTOMapper extends ObjectMapper<DemandaDoacao, DemandaDoacaoDTO> {

    private readonly _itemMapper: ObjectMapper<ItemDemandaDoacao, ItemDemandaDoacaoDTO>;

    private readonly _instituicaoMapper: ObjectMapper<Instituicao, InstituicaoDTO>;

    public constructor(params: NewDemandaDoacaoDTOMapperParams) {
        super();

        this._itemMapper = params.itemMapper;
        this._instituicaoMapper = params.instituicaoMapper;
    }

    public async mapear(entity: DemandaDoacao): Promise<DemandaDoacaoDTO> {
        return {
            id: entity.id.valor,
            necessidades: entity.necessidades,
            status: entity.status,
            data_postagem: entity.dataPostagem.toISO()!,
            itens: await this._itemMapper.mapearLista([...entity.itens]),
            instituicao: await this._instituicaoMapper.mapear(entity.instituicao)
        };
    }
}

export { DemandaDoacaoDTOMapper };
