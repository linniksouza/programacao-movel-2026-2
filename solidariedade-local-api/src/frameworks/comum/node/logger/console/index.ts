import { DateTime } from "luxon";

import { format } from "node:util";

import {
    LoggerHandler,
    NivelLog,
    PublicarLoggerHandlerInput
} from "@/infraestrutura/abstracoes/base.logger";

type CoresNivelLog = {
    [key in NivelLog]: string;
};

class ConsoleLoggerHandler implements LoggerHandler {

    /**
     * 
     * Caracteres de abertura da cor de 
     * saída do conteúdo na saída padrão
     * do console do sistema operacional.
     */
    private readonly _aberturaCoresLog: CoresNivelLog;

    /**
     * 
     * Caracteres de fechamento da cor de 
     * saída do conteúdo na saída padrão
     * do console do sistema operacional.
     */
    private readonly _fechamentoCoresLog: string;

    /**
     * 
     * Método construtor da classe.
     */
    public constructor(){
        this._aberturaCoresLog = {
            INFO: "\x1b[92m",
            ERROR: "\x1b[91m",
            WARNING: "\x1b[93m"
        };
        this._fechamentoCoresLog = "\x1b[0m\n";
    }

    /**
     * 
     * Implementação do método que executa a lógica 
     * de publicação do conteúdo de um log no console
     * do sistema operacional.
     */
    public async publicar(input: PublicarLoggerHandlerInput): Promise<void> {
        const { log, nivel, nome } = input;
        const conteudos = [];

        if(log instanceof Error){
            const linhasExcecao = await this.formatarExcecao(log);
            for(const linha of linhasExcecao)
                conteudos.push(linha);
        }else if(typeof log === "object"){
            conteudos.push(JSON.stringify(log));
        }else{
            conteudos.push(String(log));
        }

        await this.escreverLog(nome, nivel, conteudos);
    }

    /**
     * 
     * Método que realiza a formação de um objeto de 
     * exceção para um conjunto de registros de log 
     * estruturado.
     * 
     * @param e Objeto de exceção.
     * @returns Registros de log estruturados.
     */
    private async formatarExcecao(e: Error): Promise<string[]> {
        const { message, name, stack } = e;
        const conteudos = [`(${name}) ${message}`];

        if(stack){
            const linhasStack = stack.split("\n");
            for(const linha of linhasStack)
                conteudos.push(linha);
        }

        return conteudos;
    }

    /**
     * 
     * Método que realiza o conjunto de registros 
     * de log na saída no console do sistema operacional.
     * 
     * @param nome Nome do elemento que registrou o log.
     * @param nivel Nível do log a ser registrado.
     * @param conteudos Conteúdos do registro de log.
     */
    private async escreverLog(nome: string, nivel: NivelLog, conteudos: string[]): Promise<void> {
        for(const conteudo of conteudos){
            const agora = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");
            const logFormatado = `${agora} ${nivel.toUpperCase()} [${nome}] : ${conteudo}`;
            const log = `${this._aberturaCoresLog[nivel]}${logFormatado}${this._fechamentoCoresLog}`;
            process.stdout.write(format.apply(this, [log]));
        }
    }
}

export { ConsoleLoggerHandler };
