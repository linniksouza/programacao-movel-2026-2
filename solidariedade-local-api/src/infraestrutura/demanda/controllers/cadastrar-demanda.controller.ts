import { MensagemErroDTO } from "@/aplicacao/comum/dto/mensagem-erro.dto";
import { CadastrarDemanda } from "@/aplicacao/demanda/casos-uso/cadastrar-demanda.usecase";
import { DemandaDoacaoDTO } from "@/aplicacao/demanda/dto/demanda.dto";
import { NovaDemandaDoacaoDTO } from "@/aplicacao/demanda/dto/nova-demanda.dto";
import { InstituicaoNaoEncontradaException } from "@/dominio/instituicao/excecoes";
import {
    BaseController,
    BaseControllerRequest,
    BaseControllerResponse,
    HttpResponseHelper
} from "@/infraestrutura/abstracoes/base.controller";
import { Logger } from "@/infraestrutura/abstracoes/base.logger";

type NewCadastrarDemandaControllerParams = {
    useCase: CadastrarDemanda;
    logger: Logger;
};

class CadastrarDemandaController implements BaseController<NovaDemandaDoacaoDTO, DemandaDoacaoDTO | MensagemErroDTO> {

    private readonly _useCase: CadastrarDemanda;

    private readonly _logger: Logger;

    public constructor(params: NewCadastrarDemandaControllerParams) {
        this._useCase = params.useCase;
        this._logger = params.logger;
    }

    public async handle(request: BaseControllerRequest<NovaDemandaDoacaoDTO>): Promise<BaseControllerResponse<DemandaDoacaoDTO | MensagemErroDTO>> {
        try{
            await this._logger.info("Iniciando o processo de criacao de uma nova demanda de doacao...", { ...request });

            const {
                dto
            } = await this._useCase.executar({ dto: request.body as NovaDemandaDoacaoDTO });

            return HttpResponseHelper.created(dto);
        }catch(e: any){
            await this._logger.error(`Erro durante o processo de criacao a demanda de doacao: ${JSON.stringify(request.body)}...`, e);

            if(e instanceof InstituicaoNaoEncontradaException){
                return HttpResponseHelper.badRequest<MensagemErroDTO>({
                    operacao: "criar_demanda_doacao",
                    mensagem: e.message
                });
            }

            return HttpResponseHelper.internalServerError<MensagemErroDTO>({
                operacao: "criar_demanda_doacao",
                mensagem: "Não foi possível finalizar a operação. Tente novamente ou contate o administrador."
            });
        }
    }
}

export { CadastrarDemandaController };
