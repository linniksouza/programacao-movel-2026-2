import { configDotenv } from "dotenv";

import { ContainerDI } from "./frameworks/abstracoes/di";
import { LoggerFactory } from "./frameworks/comum/node/logger/logger-faactory";
import { configurarDependencias } from "./setup/dependencias.setup";
import { configurarInstanciaFastify } from "./setup/fastify.setup";

(async () => {
    configDotenv();

    await configurarDependencias();
    const container = ContainerDI.singleton();
    const factory = container.get<LoggerFactory>("LoggerFactory");
    const logger = factory.fabricar("main");

    try{
        const app = await configurarInstanciaFastify();
        await app.listen({
            host: (process.env.HTTP_HOST as string || "0.0.0.0"),
            port: parseInt(process.env.HTTP_PORT as string || "3000")
        });

        await logger.info("Aplicacao iniciada com sucesso.");
    }catch(e: any){
        // Em caso de exceção capturada, escrevemos o erro nos
        // logs da aplicação e disparamos um sinal de erro ao 
        // SO para interrupção da aplicação...
        await logger.error("Interrupcao da aplicacao...", e);
        process.exit(1);
    }
})();
