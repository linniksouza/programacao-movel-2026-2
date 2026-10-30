enum NivelLog {

    /**
     * 
     * Nível de log de registro de uma 
     * informação comum na aplicação.
     */
    INFO = "INFO",

    /**
     * 
     * Nível de log de registro de um
     * erro ocorrido na aplicação.
     */
    ERROR = "ERROR",

    /**
     * 
     * Nível de log de registro de um
     * alerta de atenção na aplicação.
     */
    WARN = "WARNING"

}

type PublicarLoggerHandlerInput = {
    nome: string;
    nivel: NivelLog;
    log: any;
};

interface LoggerHandler {

    /**
     * 
     * Método que executa a lógica de 
     * publicação do conteúdo de um 
     * log registrado na aplicação.
     * 
     * @param input Parâmetros de publicação do registro 
     * de log.
     */
    publicar(input: PublicarLoggerHandlerInput): Promise<void>;

}

interface Logger {

    /**
     * 
     * Método que registra logs da aplicação.
     * 
     * @param nivel Nível de log para registrar.
     * @param logs Dados de logs para registrar.
     */
    log(nivel: NivelLog, ...logs: any[]): Promise<void>;

    /**
     * 
     * Método que registra logs da aplicação com 
     * nível {@link NivelLog.INFO}.
     * 
     * @param logs Dados de logs para registrar.
     */
    info(...logs: any[]): Promise<void>;

    /**
     * 
     * Método que registra logs da aplicação com 
     * nível {@link NivelLog.ERROR}.
     * 
     * @param logs Dados de logs para registrar.
     */
    error(...logs: any[]): Promise<void>;

    /**
     * 
     * Método que registra logs da aplicação com 
     * nível {@link NivelLog.WARN}.
     * 
     * @param logs Dados de logs para registrar.
     */
    warn(...logs: any[]): Promise<void>;

}

export {
    Logger,
    LoggerHandler,
    NivelLog,
    PublicarLoggerHandlerInput
};
