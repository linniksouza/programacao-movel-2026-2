import { Logger, LoggerHandler } from "@/infraestrutura/abstracoes/base.logger";
import { CommonLogger } from "./common-logger";
import { ConsoleLoggerHandler } from "./console";

class LoggerFactory {

    /**
     * 
     * Conjunto de handlers de log para instanciar 
     * o objeto de logger.
     */
    private _handlers: Set<LoggerHandler>;

    /**
     * 
     * Construtor privado que já adiciona o handler
     * de log do console do sistema operacional, 
     * implementando o padrão de projetos Builder.
     */
    private constructor(){
        this._handlers = new Set(
            [new ConsoleLoggerHandler()]
        );
    }

    /**
     * 
     * Método que adiciona uma instância de 
     * handler de log na criação da instância
     * de logger.
     * 
     * @param handler Instância de handler de log para adicionar
     * @returns Referência própria do objeto de fabricação.
     */
    public comHandler(handler: LoggerHandler): LoggerFactory {
        this._handlers.add(handler);

        return this;
    }

    /**
     * 
     * Método que gera a nova instância de 
     * logger configurada, implementando o
     * padrão de projetos Builder.
     * 
     * @param nome Nome do agente que fará uso da instância.
     * @returns Instância de logger configurada.
     */
    public fabricar(nome: string): Logger {
        return new CommonLogger({
            nome: nome,
            handlers: Array.from(this._handlers)
        });
    }

    /**
     * 
     * Método que instancia um objeto de 
     * fabricação de loggers, implementando
     * o padrão de projetos Builder.
     * 
     * @returns Instância de fabricação de loggers.
     */
    public static iniciar(): LoggerFactory {
        return new LoggerFactory();
    }
}

export { LoggerFactory };
