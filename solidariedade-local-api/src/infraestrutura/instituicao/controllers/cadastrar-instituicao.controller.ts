import { CadastrarInstituicao } from "@/aplicacao/instituicao/casos-uso/cadastrar-instituicao.usecase";
import { InstituicaoDTO } from "@/aplicacao/instituicao/dto/instituicao.dto";
import { NovaInstituicaoDTO } from "@/aplicacao/instituicao/dto/nova-instituicao.dto";
import {
    BaseController,
    BaseControllerRequest,
    BaseControllerResponse,
    HttpResponseHelper
} from "@/infraestrutura/abstracoes/base.controller";
import { Logger } from "@/infraestrutura/abstracoes/base.logger";

type NewCadastrarInstituicaoControllerParams = {
    useCase: CadastrarInstituicao;
    logger: Logger;
};

class CadastrarInstituicaoController implements BaseController<NovaInstituicaoDTO, InstituicaoDTO> {

    private readonly _useCase: CadastrarInstituicao;

    private readonly _logger: Logger;

    public constructor(params: NewCadastrarInstituicaoControllerParams) {
        this._useCase = params.useCase;
        this._logger = params.logger;
    }

    public async handle(request: BaseControllerRequest<NovaInstituicaoDTO, any, any>): Promise<BaseControllerResponse<InstituicaoDTO>> {
        await this._logger.info("Iniciando o processo de criacao de uma nova instituicao social...", { ...request });

        const {
            dto
        } = await this._useCase.executar({ dto: request.body as NovaInstituicaoDTO });

        return HttpResponseHelper.created(dto);
    }
}

export { CadastrarInstituicaoController };
