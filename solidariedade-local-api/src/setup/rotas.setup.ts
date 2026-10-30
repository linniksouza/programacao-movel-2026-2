import { FastifyInstance } from "fastify";

import { demandaRoutes } from "@/frameworks/demanda/fastify/routes";
import { doacaoRoutes } from "@/frameworks/doacao/fastify/routes";
import { instituicaoRoutes } from "@/frameworks/instituicao/fastify/routes";

const configurarRotas = async (fastify: FastifyInstance): Promise<void> => {
    fastify.register(instituicaoRoutes, { prefix: "/api/instituicoes" });
    fastify.register(demandaRoutes, { prefix: "/api/demandas" });
    fastify.register(doacaoRoutes, { prefix: "/api/doacoes" });
};

export { configurarRotas };
