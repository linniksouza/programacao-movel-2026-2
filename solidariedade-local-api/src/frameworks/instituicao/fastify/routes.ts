import { FastifyInstance } from "fastify";

import { DemandaDoacaoDTO } from "@/aplicacao/demanda/dto/demanda.dto";
import { InstituicaoDTO } from "@/aplicacao/instituicao/dto/instituicao.dto";
import { ContainerDI } from "@/frameworks/abstracoes/di";
import { fastifyControllerAdapter } from "@/frameworks/comum/fastify/controller-adapter";
import { BaseController } from "@/infraestrutura/abstracoes/base.controller";

const instituicaoRoutes = async (fastify: FastifyInstance): Promise<void> => {
    const container = ContainerDI.singleton();
    const buscarInstituicoes = container.get<BaseController<void, InstituicaoDTO[]>>("BuscarInstituicoesController");

    fastify.get("/", fastifyControllerAdapter(buscarInstituicoes));
};

export { instituicaoRoutes };
