import { FastifyReply, FastifyRequest } from "fastify";

import { BaseController } from "@/infraestrutura/abstracoes/base.controller";

type FastifyAdapterFunction = (request: FastifyRequest, reply: FastifyReply) => Promise<FastifyReply>;

const fastifyControllerAdapter = (controller: BaseController<any, any>): FastifyAdapterFunction => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        try{
            const response = await controller.handle({
                body: request.body ?? {},
                params: request.params ?? {},
                queryString: request.query ?? {}
            });

            if(response.headers){
                Object.entries(response.headers).forEach(([key, value]) => {
                    reply.header(key, value);
                });
            }

            return reply.code(response.statusCode).send(response.body);
        }catch(e: any){
            return reply.code(500).send({ message: e.message });
        }
    };
};

export { fastifyControllerAdapter };
