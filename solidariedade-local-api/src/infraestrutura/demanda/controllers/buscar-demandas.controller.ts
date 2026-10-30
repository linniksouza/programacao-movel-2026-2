import { BuscarDemandas } from "@/aplicacao/demanda/casos-uso/buscar-demandas.usecase";
import { DemandaDoacaoDTO } from "@/aplicacao/demanda/dto/demanda.dto";
import {
    BaseController,
    BaseControllerRequest,
    BaseControllerResponse,
    HttpResponseHelper
} from "@/infraestrutura/abstracoes/base.controller";
import { Logger } from "@/infraestrutura/abstracoes/base.logger";

type NewBuscarDemandasControllerParams = {
    useCase: BuscarDemandas;
    logger: Logger;
};

class BuscarDemandasController implements BaseController<void, DemandaDoacaoDTO[]> {

    private readonly _useCase: BuscarDemandas;

    private readonly _logger: Logger;

    public constructor(params: NewBuscarDemandasControllerParams) {
        this._useCase = params.useCase;
        this._logger = params.logger;
    }

    public async handle(request: BaseControllerRequest<void>): Promise<BaseControllerResponse<DemandaDoacaoDTO[]>> {
        await this._logger.info("Iniciando a buscar por demandas de doacao...", { ...request });
        const { loteDto } = await this._useCase.executar();

        return HttpResponseHelper.ok(loteDto);
    }
}

export { BuscarDemandasController };
