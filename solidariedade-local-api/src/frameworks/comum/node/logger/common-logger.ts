import { Logger, LoggerHandler, NivelLog } from "@/infraestrutura/abstracoes/base.logger";

/**
 * 
 * Tipagem que define os parâmetros de criação de 
 * um objeto de registro de logs da aplicação.
 * 
 * @author Linnik Souza <linniksouza@bemol.com.br>
 */
type NewCommonLoggerParams = {
    nome: string;
    handlers: LoggerHandler[];
};

/**
 * 
 * Classe comum que implementa as operações de 
 * registro de logs da aplicação.
 * 
 * @author Linnik Souza <linniksouza@bemol.com.br>
 */
class CommonLogger implements Logger {

    /**
     * 
     * Nome base do agente que faz uso da instância 
     * de logger em execução.
     */
    private readonly _nome: string;

    /**
     * 
     * Lista de todos os handlers utilizados para
     * registro de log.
     */
    private readonly _handlers: LoggerHandler[];

    /**
     * 
     * Método construtor da classe.
     * 
     * @param params Parâmetros de criação do objeto.
     */
    public constructor(params: NewCommonLoggerParams) {
        const { handlers, nome } = params;

        // Se não tiver sido definia uma lista de handlers
        // ou a lista de handlers estiver vazia, levanta 
        // uma exceção...
        if(!handlers || handlers.length === 0)
            throw new Error("Deve ter pelo menos um handler de log no array de handlers.");

        this._nome = nome;
        this._handlers = handlers;
    }

    /**
     * 
     * @inheritdoc
     */
    public async log(nivel: NivelLog, ...logs: any[]): Promise<void> {
        for(let handler of this._handlers){
            for(let log of logs){
                await handler.publicar({
                    nome: this._nome,
                    nivel: nivel,
                    log: log
                });
            }
        }
    }

    /**
     * 
     * @inheritdoc
     */
    public async info(...logs: any[]): Promise<void> {
        await this.log(NivelLog.INFO, ...logs);
    }

    /**
     * 
     * @inheritdoc
     */
    public async error(...logs: any[]): Promise<void> {
        await this.log(NivelLog.ERROR, ...logs);
    }

    /**
     * 
     * @inheritdoc
     */
    public async warn(...logs: any[]): Promise<void> {
        await this.log(NivelLog.WARN, ...logs);
    }
}

export { CommonLogger };
