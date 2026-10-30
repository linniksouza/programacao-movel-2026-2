import { MensagemErroDTO } from "@/aplicacao/comum/dto/mensagem-erro.dto";
import { RegistrarDoacao } from "@/aplicacao/doacao/casos-uso/registrar-doacao.usecase";
import { DoacaoDTO } from "@/aplicacao/doacao/dto/doacao.dto";
import { NovaDoacaoDTO } from "@/aplicacao/doacao/dto/nova-doacao.dto";
import { DemandaNaoEncontradaException } from "@/dominio/demanda/excecoes";
import { DoadorNaoEncontradoException } from "@/dominio/doador/excecoes";
import {
    BaseController,
    BaseControllerRequest,
    BaseControllerResponse,
    HttpResponseHelper
} from "@/infraestrutura/abstracoes/base.controller";
import { Logger } from "@/infraestrutura/abstracoes/base.logger";

type NewRegistrarDoacaoControllerParams = {
    useCase: RegistrarDoacao;
    logger: Logger;
};

class RegistrarDoacaoController implements BaseController<NovaDoacaoDTO, DoacaoDTO | MensagemErroDTO> {

    private readonly _useCase: RegistrarDoacao;

    private readonly _logger: Logger;

    public constructor(params: NewRegistrarDoacaoControllerParams) {
        this._useCase = params.useCase;
        this._logger = params.logger;
    }

    public async handle(request: BaseControllerRequest<NovaDoacaoDTO>): Promise<BaseControllerResponse<DoacaoDTO | MensagemErroDTO>> {
        try{
            await this._logger.info("Iniciando o processo de registro de uma nova doacao...", { ...request });
    
            const {
                dto
            } = await this._useCase.executar({ dto: request.body as NovaDoacaoDTO });
    
            return HttpResponseHelper.created(dto);
        }catch(e: any){
            await this._logger.error(`Erro durante o processo de registro de uma nova doacao: ${JSON.stringify(request.body)}...`, e);

            if(
                (e instanceof DoadorNaoEncontradoException) ||
                (e instanceof DemandaNaoEncontradaException)
            ){
                return HttpResponseHelper.badRequest<MensagemErroDTO>({
                    operacao: "registrar_doacao",
                    mensagem: e.message
                });
            }

            return HttpResponseHelper.internalServerError<MensagemErroDTO>({
                operacao: "registrar_doacao",
                mensagem: "Não foi possível finalizar a operação. Tente novamente ou contate o administrador."
            });
        }
    }
}

export { RegistrarDoacaoController };
