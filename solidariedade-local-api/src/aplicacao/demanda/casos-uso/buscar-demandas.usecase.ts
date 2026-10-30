import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { DemandaDoacaoDTO } from "@/aplicacao/demanda/dto/demanda.dto";
import { DemandaDoacao } from "@/dominio/demanda/agregados/demanda.aggregate";
import { DemandasDoacoesRepository } from "@/dominio/demanda/repositorios/demandas.repository";

type NewBuscarDemandasParams = {
    repository: DemandasDoacoesRepository;
    demandaMapper: ObjectMapper<DemandaDoacao, DemandaDoacaoDTO>;
};
type BuscarDemandasOutput = {
    loteDto: DemandaDoacaoDTO[];
};

class BuscarDemandas {

    private readonly _repository: DemandasDoacoesRepository;

    private readonly _demandaMapper: ObjectMapper<DemandaDoacao, DemandaDoacaoDTO>;

    public constructor(params: NewBuscarDemandasParams) {
        this._repository = params.repository;
        this._demandaMapper = params.demandaMapper;
    }

    public async executar(): Promise<BuscarDemandasOutput> {
        const demandas = await this._repository.buscarDemandas();
        const loteDto = await this._demandaMapper.mapearLista(demandas);

        return { loteDto };
    }
}

export { BuscarDemandas };
