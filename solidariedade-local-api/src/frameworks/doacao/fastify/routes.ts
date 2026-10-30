import { FastifyInstance } from "fastify";

import { DoacaoDTO } from "@/aplicacao/doacao/dto/doacao.dto";
import { NovaDoacaoDTO } from "@/aplicacao/doacao/dto/nova-doacao.dto";
import { ContainerDI } from "@/frameworks/abstracoes/di";
import { fastifyControllerAdapter } from "@/frameworks/comum/fastify/controller-adapter";
import { BaseController } from "@/infraestrutura/abstracoes/base.controller";

const doacaoRoutes = async (fastify: FastifyInstance): Promise<void> => {
    const container = ContainerDI.singleton();
    const registrarDoacao = container.get<BaseController<NovaDoacaoDTO, DoacaoDTO>>("RegistrarDoacaoController");

    fastify.post("/", fastifyControllerAdapter(registrarDoacao));
};

export { doacaoRoutes };
