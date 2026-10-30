import { BuscarInstituicoes } from "@/aplicacao/instituicao/casos-uso/buscar-instituicoes.usecase";
import { InstituicaoDTO } from "@/aplicacao/instituicao/dto/instituicao.dto";
import {
    BaseController,
    BaseControllerRequest,
    BaseControllerResponse,
    HttpResponseHelper
} from "@/infraestrutura/abstracoes/base.controller";
import { Logger } from "@/infraestrutura/abstracoes/base.logger";

type NewBuscarInstituicoesControllerParams = {
    useCase: BuscarInstituicoes;
    logger: Logger;
};

class BuscarInstituicoesController implements BaseController<void, InstituicaoDTO[]> {

    private readonly _useCase: BuscarInstituicoes;

    private readonly _logger: Logger;

    public constructor(params: NewBuscarInstituicoesControllerParams) {
        this._useCase = params.useCase;
        this._logger = params.logger;
    }

    public async handle(request: BaseControllerRequest<void>): Promise<BaseControllerResponse<InstituicaoDTO[]>> {
        await this._logger.info("Iniciando a buscar por instituicoes sociais...", { ...request });
        const { loteDto } = await this._useCase.executar();

        return HttpResponseHelper.ok(loteDto);
    }
}

export { BuscarInstituicoesController };
