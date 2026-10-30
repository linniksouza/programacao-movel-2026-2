import { FastifyInstance } from "fastify";

import { MensagemErroDTO } from "@/aplicacao/comum/dto/mensagem-erro.dto";
import { DemandaDoacaoDTO } from "@/aplicacao/demanda/dto/demanda.dto";
import { NovaDemandaDoacaoDTO } from "@/aplicacao/demanda/dto/nova-demanda.dto";
import { ContainerDI } from "@/frameworks/abstracoes/di";
import { fastifyControllerAdapter } from "@/frameworks/comum/fastify/controller-adapter";
import { BaseController } from "@/infraestrutura/abstracoes/base.controller";

const demandaRoutes = async (fastify: FastifyInstance): Promise<void> => {
    const container = ContainerDI.singleton();
    const buscarDemandas = container.get<BaseController<void, DemandaDoacaoDTO[]>>("BuscarDemandasController");
    const cadastrarDemanda = container.get<BaseController<NovaDemandaDoacaoDTO, DemandaDoacaoDTO | MensagemErroDTO>>("CadastrarDemandaController");

    fastify.get("/", fastifyControllerAdapter(buscarDemandas));
    fastify.post("/", fastifyControllerAdapter(cadastrarDemanda));
};

export { demandaRoutes };
