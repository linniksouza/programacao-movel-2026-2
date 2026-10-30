import fastify, { FastifyInstance } from "fastify";

import { configurarRotas } from "./rotas.setup";

const configurarInstanciaFastify = async (): Promise<FastifyInstance> => {
    const app = fastify({
        logger: true
    });

    app.register(configurarRotas);

    return app;
};

export { configurarInstanciaFastify };
