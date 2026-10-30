import { PrismaPg } from "@prisma/adapter-pg";

import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { MensagemErroDTO } from "@/aplicacao/comum/dto/mensagem-erro.dto";
import { BuscarDemandas } from "@/aplicacao/demanda/casos-uso/buscar-demandas.usecase";
import { CadastrarDemanda } from "@/aplicacao/demanda/casos-uso/cadastrar-demanda.usecase";
import { DemandaDoacaoDTO, ItemDemandaDoacaoDTO } from "@/aplicacao/demanda/dto/demanda.dto";
import { NovaDemandaDoacaoDTO } from "@/aplicacao/demanda/dto/nova-demanda.dto";
import { DemandaDoacaoDTOMapper } from "@/aplicacao/demanda/mapper/demanda-dto.mapper";
import { ItemDemandaDoacaoDTOMapper } from "@/aplicacao/demanda/mapper/item-demanda-dto.mapper";
import { RegistrarDoacao } from "@/aplicacao/doacao/casos-uso/registrar-doacao.usecase";
import {
    DemandaDoacaoFeitaDTO,
    DoacaoDTO,
    ItemDoacaoDTO
} from "@/aplicacao/doacao/dto/doacao.dto";
import { NovaDoacaoDTO } from "@/aplicacao/doacao/dto/nova-doacao.dto";
import { DemandaDoacaoFeitaDTOMapper } from "@/aplicacao/doacao/mappers/demanda-doacao-feita-dto.mapper";
import { DoacaoDTOMapper } from "@/aplicacao/doacao/mappers/doacao-dto.mapper";
import { ItemDoacaoDTOMapper } from "@/aplicacao/doacao/mappers/item-doacao-dto.mapper";
import { BuscarInstituicoes } from "@/aplicacao/instituicao/casos-uso/buscar-instituicoes.usecase";
import { CadastrarInstituicao } from "@/aplicacao/instituicao/casos-uso/cadastrar-instituicao.usecase";
import { InstituicaoDTO } from "@/aplicacao/instituicao/dto/instituicao.dto";
import { NovaInstituicaoDTO } from "@/aplicacao/instituicao/dto/nova-instituicao.dto";
import { InstituicaoDTOMapper } from "@/aplicacao/instituicao/mappers/instituicao-dto.mapper";
import { IdFactory } from "@/dominio/abstracoes/base.identity";
import { DemandaDoacao } from "@/dominio/demanda/agregados/demanda.aggregate";
import { ItemDemandaDoacao } from "@/dominio/demanda/entidades/item-demanda.entity";
import { IdDemandaDoacao } from "@/dominio/demanda/identificadores/id-demanda.identity";
import { IdItemDemandaDoacao } from "@/dominio/demanda/identificadores/id-item-demanda.identity";
import { DemandasDoacoesRepository } from "@/dominio/demanda/repositorios/demandas.repository";
import { Doacao } from "@/dominio/doacao/agregados/doacao.aggregate";
import { ItemDoacao } from "@/dominio/doacao/entidades/item-doacao.entity";
import { IdDoacao } from "@/dominio/doacao/identificadores/id-doacao.identity";
import { IdItemDoacao } from "@/dominio/doacao/identificadores/id-item-doacao.identity";
import { DoacoesRepository } from "@/dominio/doacao/repositorios/doacoes.repository";
import { Doador } from "@/dominio/doador/entidades/doador.entity";
import { DoadoresRepository } from "@/dominio/doador/repositorios/doadores.repository";
import { Instituicao } from "@/dominio/instituicao/entidades/instituicao.entity";
import { InstituicoesRepository } from "@/dominio/instituicao/repositorios/instituicoes.repository";
import { ContainerDI } from "@/frameworks/abstracoes/di";
import { LoggerFactory } from "@/frameworks/comum/node/logger/logger-faactory";
import { PrismaClient } from "@/frameworks/comum/prismaclient/client";
import { DemandaDoacaoModel, DoacaoFeitaModel } from "@/frameworks/comum/prismaclient/models";
import { UUIDIdDemandaDoacaoFactory } from "@/frameworks/demanda/node/uuid-id-demanda.factory";
import { UUIDIdItemDemandaDoacaoFactory } from "@/frameworks/demanda/node/uuid-id-item-demanda.factory";
import { PrismaDemandaDoacao, PrismaItemDemandaDoacao } from "@/frameworks/demanda/prisma/entidades";
import { DemandaDoacaoMapper } from "@/frameworks/demanda/prisma/mappers/demanda.mapper";
import { ItemDemandaDoacaoMapper } from "@/frameworks/demanda/prisma/mappers/item-demanda.mapper";
import { PrismaDemandaDoacaoMapper } from "@/frameworks/demanda/prisma/mappers/prisma-demanda.mapper";
import { PrismaItemDemandaDoacaoMapper } from "@/frameworks/demanda/prisma/mappers/prisma-item-demanda.mapper";
import { PrismaDemandasDoacoesRepository } from "@/frameworks/demanda/prisma/repositorios/prisma-demandas.repository";
import { UUIDIdDoacaoFactory } from "@/frameworks/doacao/node/uuid-id-doacao.factory";
import { UUIDIdItemDoacaoFactory } from "@/frameworks/doacao/node/uuid-id-item-doacao.factory";
import { PrismaDoacao, PrismaItemDoacao } from "@/frameworks/doacao/prisma/entidades";
import { DoacaoMapper } from "@/frameworks/doacao/prisma/mappers/doacao.mapper";
import { ItemDoacaoMapper } from "@/frameworks/doacao/prisma/mappers/item-doacao.mapper";
import { PrismaDoacaoMapper } from "@/frameworks/doacao/prisma/mappers/prisma-doacao.mapper";
import { PrismaItemDoacaoMapper } from "@/frameworks/doacao/prisma/mappers/prisma-item-doacao.mapper";
import { PrismaDoacoesRepository } from "@/frameworks/doacao/prisma/repositorios/prisma-doacoes.repository";
import { PrismaDoador } from "@/frameworks/doador/prisma/entidades";
import { DoadorMapper } from "@/frameworks/doador/prisma/mappers/doador.mapper";
import { PrismaDoadorMapper } from "@/frameworks/doador/prisma/mappers/prisma-doador.mapper";
import { PrismaDoadoresRepository } from "@/frameworks/doador/prisma/repositorios/prisma-doadores.repository";
import { PrismaInstituicao } from "@/frameworks/instituicao/prisma/entidades";
import { InstituicaoMapper } from "@/frameworks/instituicao/prisma/mappers/instituicao.mapper";
import { PrismaInstituicaoMapper } from "@/frameworks/instituicao/prisma/mappers/prisma-instituicao.mapper";
import { PrismaInstituicoesRepository } from "@/frameworks/instituicao/prisma/repositorios/prisma-instituicoes.repository";
import { BaseController } from "@/infraestrutura/abstracoes/base.controller";
import { BuscarDemandasController } from "@/infraestrutura/demanda/controllers/buscar-demandas.controller";
import { CadastrarDemandaController } from "@/infraestrutura/demanda/controllers/cadastrar-demanda.controller";
import { RegistrarDoacaoController } from "@/infraestrutura/doacao/controllers/registrar-doacao.controller";
import { BuscarInstituicoesController } from "@/infraestrutura/instituicao/controllers/buscar-instituicoes.controller";
import { CadastrarInstituicaoController } from "@/infraestrutura/instituicao/controllers/cadastrar-instituicao.controller";

const configurarDependencias = async (): Promise<void> => {
    const container = ContainerDI.singleton();

    // Objetos de uso comum na aplicação...
    container.set("LoggerFactory", (_: ContainerDI): LoggerFactory => {
        return LoggerFactory.iniciar();
    });
    container.set("PrismaClient", (cont: ContainerDI): PrismaClient => {
        const factory = cont.get<LoggerFactory>("LoggerFactory");
        const logger = factory.fabricar("PrismaClient");

        const adapter = new PrismaPg(
            {
                connectionString: process.env.DATABASE_URL as string
            },
            {
                schema: process.env.DATABASE_SCHEMA as string,
            }
        );
        const prisma = new PrismaClient({
            adapter: adapter,
            log: [
                { level: "info", emit: "event" },
                { level: "warn", emit: "event" },
                { level: "error", emit: "event" },
                { level: "query", emit: "event" },
            ]
        });

        prisma.$on("info", async (e) => {
            const { message } = e;

            await logger.info(message);
        });
        prisma.$on("warn", async (e) => {
            const { message } = e;

            await logger.warn(message);
        });
        prisma.$on("error", async (e) => {
            const { message } = e;

            await logger.error(message);
        });
        prisma.$on("query", async (e) => {
            const { duration, params, query } = e;

            await logger.info(`Query: ${query}`);
            await logger.info(`Params: ${params}`);
            await logger.info(`Duration: ${duration}ms`);
        });

        return prisma;
    });

    // Objetos de mapeamento de entidades ORM para entidades de negócio...
    container.set("InstituicaoMapper", (_: ContainerDI): ObjectMapper<PrismaInstituicao, Instituicao> => {
        return new InstituicaoMapper();
    });
    container.set("ItemDemandaDoacaoMapper", (_: ContainerDI): ObjectMapper<PrismaItemDemandaDoacao, ItemDemandaDoacao> => {
        return new ItemDemandaDoacaoMapper();
    });
    container.set("DemandaDoacaoMapper", (cont: ContainerDI): ObjectMapper<PrismaDemandaDoacao, DemandaDoacao> => {
        const itensMapper = cont.get<ObjectMapper<PrismaItemDemandaDoacao, ItemDemandaDoacao>>("ItemDemandaDoacaoMapper");
        const instituicaoMapper = cont.get<ObjectMapper<PrismaInstituicao, Instituicao>>("InstituicaoMapper");

        return new DemandaDoacaoMapper({
            itensMapper,
            instituicaoMapper
        });
    });
    container.set("PrismaInstituicaoMapper", (_: ContainerDI): ObjectMapper<Instituicao, PrismaInstituicao> => {
        return new PrismaInstituicaoMapper();
    });
    container.set("PrismaItemDemandaDoacaoMapper", (_: ContainerDI): ObjectMapper<[ItemDemandaDoacao, IdDemandaDoacao], PrismaItemDemandaDoacao> => {
        return new PrismaItemDemandaDoacaoMapper();
    });
    container.set("PrismaDemandaDoacaoMapper", (_: ContainerDI): ObjectMapper<DemandaDoacao, DemandaDoacaoModel> => {
        return new PrismaDemandaDoacaoMapper()
    });
    container.set("DoadorMapper", (_: ContainerDI): ObjectMapper<PrismaDoador, Doador> => {
        return new DoadorMapper();
    });
    container.set("PrismaDoadorMapper", (_: ContainerDI): ObjectMapper<Doador, PrismaDoador> => {
        return new PrismaDoadorMapper();
    });
    container.set("ItemDoacaoMapper", (_: ContainerDI): ObjectMapper<PrismaItemDoacao, ItemDoacao> => {
        return new ItemDoacaoMapper();
    });
    container.set("DoacaoMapper", (cont: ContainerDI): ObjectMapper<PrismaDoacao, Doacao> => {
        const itemMapper = cont.get<ObjectMapper<PrismaItemDoacao, ItemDoacao>>("ItemDoacaoMapper");
        const doadorMapper = cont.get<ObjectMapper<PrismaDoador, Doador>>("DoadorMapper");
        const demandaMapper = cont.get<ObjectMapper<PrismaDemandaDoacao, DemandaDoacao>>("DemandaDoacaoMapper");

        return new DoacaoMapper({
            itemMapper,
            doadorMapper,
            demandaMapper
        });
    });
    container.set("PrismaItemDoacaMapper", (_: ContainerDI): ObjectMapper<[ItemDoacao, IdDoacao], PrismaItemDoacao> => {
        return new PrismaItemDoacaoMapper();
    });
    container.set("PrismaDoacaMapper", (_: ContainerDI): ObjectMapper<Doacao, DoacaoFeitaModel> => {
        return new PrismaDoacaoMapper();
    });

    // Objetos de repositório de entidades de negócio...
    container.set("InstituicoesRepository", (cont: ContainerDI): InstituicoesRepository => {
        const conexao = cont.get<PrismaClient>("PrismaClient");
        const instituicaoMapper = cont.get<ObjectMapper<PrismaInstituicao, Instituicao>>("InstituicaoMapper");
        const prismaInstituicaoMapper = cont.get<ObjectMapper<Instituicao, PrismaInstituicao>>("PrismaInstituicaoMapper");

        return new PrismaInstituicoesRepository({
            conexao,
            instituicaoMapper,
            prismaInstituicaoMapper
        });
    });
    container.set("DemandasDoacoesRepository", (cont: ContainerDI): DemandasDoacoesRepository => {
        const conexao = cont.get<PrismaClient>("PrismaClient");
        const demandaMapper = cont.get<ObjectMapper<PrismaDemandaDoacao, DemandaDoacao>>("DemandaDoacaoMapper");
        const prismaDemandaMapper = cont.get<ObjectMapper<DemandaDoacao, DemandaDoacaoModel>>("PrismaDemandaDoacaoMapper");
        const prismaItemDemandaMapper = cont.get<ObjectMapper<[ItemDemandaDoacao, IdDemandaDoacao], PrismaItemDemandaDoacao>>("PrismaItemDemandaDoacaoMapper");

        return new PrismaDemandasDoacoesRepository({
            conexao,
            demandaMapper,
            prismaDemandaMapper,
            prismaItemDemandaMapper
        });
    });
    container.set("DoacoesRepository", (cont: ContainerDI): DoacoesRepository => {
        const conexao = cont.get<PrismaClient>("PrismaClient");
        const doacaoMapper = cont.get<ObjectMapper<PrismaDoacao, Doacao>>("DoacaoMapper");
        const prismaDoacaoMapper = cont.get<ObjectMapper<Doacao, DoacaoFeitaModel>>("PrismaDoacaMapper");
        const prismaItemDoacaoMapper = cont.get<ObjectMapper<[ItemDoacao, IdDoacao], PrismaItemDoacao>>("PrismaItemDoacaMapper");

        return new PrismaDoacoesRepository({
            conexao,
            doacaoMapper,
            prismaDoacaoMapper,
            prismaItemDoacaoMapper
        });
    });
    container.set("DoadoresRepository", (cont: ContainerDI): DoadoresRepository => {
        const conexao = cont.get<PrismaClient>("PrismaClient");
        const entityMapper = cont.get<ObjectMapper<PrismaDoador, Doador>>("DoadorMapper");
        const prismaMapper = cont.get<ObjectMapper<Doador, PrismaDoador>>("PrismaDoadorMapper");

        return new PrismaDoadoresRepository({
            conexao,
            entityMapper,
            prismaMapper
        });
    });

    // Objetos de fabricação de identificadores de entidades...
    container.set("IdItemDemandaDoacaoFactory", (_: ContainerDI): IdFactory<IdItemDemandaDoacao> => {
        return new UUIDIdItemDemandaDoacaoFactory();
    });
    container.set("IdDemandaDoacaoFactory", (_: ContainerDI): IdFactory<IdDemandaDoacao> => {
        return new UUIDIdDemandaDoacaoFactory();
    });
    container.set("IdItemDoacaoFactory", (_: ContainerDI): IdFactory<IdItemDoacao> => {
        return new UUIDIdItemDoacaoFactory();
    });
    container.set("IdDoacaoFactory", (_: ContainerDI): IdFactory<IdDoacao> => {
        return new UUIDIdDoacaoFactory();
    });

    // Objetos de mapeamento de entidades e DTOs...
    container.set("InstituicaoDTOMapper", (_: ContainerDI): ObjectMapper<Instituicao, InstituicaoDTO> => {
        return new InstituicaoDTOMapper();
    });
    container.set("ItemDemandaDoacaoDTOMapper", (_: ContainerDI): ObjectMapper<ItemDemandaDoacao, ItemDemandaDoacaoDTO> => {
        return new ItemDemandaDoacaoDTOMapper();
    });
    container.set("DemandaDTOMapper", (cont: ContainerDI): ObjectMapper<DemandaDoacao, DemandaDoacaoDTO> => {
        const itemMapper = cont.get<ObjectMapper<ItemDemandaDoacao, ItemDemandaDoacaoDTO>>("ItemDemandaDoacaoDTOMapper");
        const instituicaoMapper = cont.get<ObjectMapper<Instituicao, InstituicaoDTO>>("InstituicaoDTOMapper");

        return new DemandaDoacaoDTOMapper({
            itemMapper,
            instituicaoMapper
        });
    });
    container.set("ItemDoacaoDTOMapper", (_: ContainerDI): ObjectMapper<ItemDoacao, ItemDoacaoDTO> => {
        return new ItemDoacaoDTOMapper();
    });
    container.set("DemandaDoacaoFeitaDTOMapper", (_: ContainerDI): ObjectMapper<DemandaDoacao, DemandaDoacaoFeitaDTO> => {
        return new DemandaDoacaoFeitaDTOMapper();
    });
    container.set("DoacaoDTOMapper", (cont: ContainerDI): ObjectMapper<Doacao, DoacaoDTO> => {
        const itemMapper = cont.get<ObjectMapper<ItemDoacao, ItemDoacaoDTO>>("ItemDoacaoDTOMapper");
        const demandaMapper = cont.get<ObjectMapper<DemandaDoacao, DemandaDoacaoFeitaDTO>>("DemandaDoacaoFeitaDTOMapper");

        return new DoacaoDTOMapper({
            itemMapper,
            demandaMapper
        });
    });

    // Objetos de casos de uso da aplicação...
    container.set("BuscarInstituicoes", (cont: ContainerDI): BuscarInstituicoes => {
        const repository = cont.get<InstituicoesRepository>("InstituicoesRepository");
        const instituicaoMapper = cont.get<ObjectMapper<Instituicao, InstituicaoDTO>>("InstituicaoDTOMapper");

        return new BuscarInstituicoes({
            repository,
            instituicaoMapper
        });
    });
    container.set("CadastrarInstituicao", (cont: ContainerDI): CadastrarInstituicao => {
        const repository = cont.get<InstituicoesRepository>("InstituicoesRepository");
        const instituicaoMapper = cont.get<ObjectMapper<Instituicao, InstituicaoDTO>>("InstituicaoDTOMapper");

        return new CadastrarInstituicao({
            repository,
            instituicaoMapper
        });
    });
    container.set("BuscarDemandas", (cont: ContainerDI): BuscarDemandas => {
        const repository = cont.get<DemandasDoacoesRepository>("DemandasDoacoesRepository");
        const demandaMapper = cont.get<ObjectMapper<DemandaDoacao, DemandaDoacaoDTO>>("DemandaDTOMapper");

        return new BuscarDemandas({
            repository,
            demandaMapper
        });
    });
    container.set("CadastrarDemanda", (cont: ContainerDI): CadastrarDemanda => {
        const instituicoesRepository = cont.get<InstituicoesRepository>("InstituicoesRepository");
        const demandasRepository = cont.get<DemandasDoacoesRepository>("DemandasDoacoesRepository");
        const idItemDemandaFactory = cont.get<IdFactory<IdItemDemandaDoacao>>("IdItemDemandaDoacaoFactory");
        const idDemandaFactory = cont.get<IdFactory<IdDemandaDoacao>>("IdDemandaDoacaoFactory");
        const demandaMapper = cont.get<ObjectMapper<DemandaDoacao, DemandaDoacaoDTO>>("DemandaDTOMapper");

        return new CadastrarDemanda({
            instituicoesRepository,
            demandasRepository,
            idItemDemandaFactory,
            idDemandaFactory,
            demandaMapper
        });
    });
    container.set("RegistrarDoacao", (cont: ContainerDI): RegistrarDoacao => {
        const doadoresRepository = cont.get<DoadoresRepository>("DoadoresRepository");
        const demandasRepository = cont.get<DemandasDoacoesRepository>("DemandasDoacoesRepository");
        const doacoesRepository = cont.get<DoacoesRepository>("DoacoesRepository");
        const idItemDoacaoFactory = cont.get<IdFactory<IdItemDoacao>>("IdItemDoacaoFactory");
        const idDoacaoFactory = cont.get<IdFactory<IdDoacao>>("IdDoacaoFactory");
        const doacaoMapper = cont.get<ObjectMapper<Doacao, DoacaoDTO>>("DoacaoDTOMapper");

        return new RegistrarDoacao({
            doadoresRepository,
            demandasRepository,
            doacoesRepository,
            idItemDoacaoFactory,
            idDoacaoFactory,
            doacaoMapper
        });
    });

    // Objetos de controller HTTP da aplicação...
    container.set("BuscarInstituicoesController", (cont: ContainerDI): BaseController<void, InstituicaoDTO[]> => {
        const useCase = cont.get<BuscarInstituicoes>("BuscarInstituicoes");
        const factory = cont.get<LoggerFactory>("LoggerFactory");
        const logger = factory.fabricar("BuscarInstituicoesController");

        return new BuscarInstituicoesController({
            useCase,
            logger
        });
    });
    container.set("CadastrarInstituicaoController", (cont: ContainerDI): BaseController<NovaInstituicaoDTO, InstituicaoDTO> => {
        const useCase = cont.get<CadastrarInstituicao>("CadastrarInstituicao");
        const factory = cont.get<LoggerFactory>("LoggerFactory");
        const logger = factory.fabricar("CadastrarInstituicaoController");

        return new CadastrarInstituicaoController({
            useCase,
            logger
        });
    });
    container.set("BuscarDemandasController", (cont: ContainerDI): BaseController<void, DemandaDoacaoDTO[]> => {
        const useCase = cont.get<BuscarDemandas>("BuscarDemandas");
        const factory = cont.get<LoggerFactory>("LoggerFactory");
        const logger = factory.fabricar("BuscarDemandasController");

        return new BuscarDemandasController({
            useCase,
            logger
        });
    });
    container.set("CadastrarDemandaController", (cont: ContainerDI): BaseController<NovaDemandaDoacaoDTO, DemandaDoacaoDTO | MensagemErroDTO> => {
        const useCase = cont.get<CadastrarDemanda>("CadastrarDemanda");
        const factory = cont.get<LoggerFactory>("LoggerFactory");
        const logger = factory.fabricar("CadastrarDemandaController");

        return new CadastrarDemandaController({
            useCase,
            logger
        });
    });
    container.set("RegistrarDoacaoController", (cont: ContainerDI): BaseController<NovaDoacaoDTO, DoacaoDTO | MensagemErroDTO> => {
        const useCase = cont.get<RegistrarDoacao>("RegistrarDoacao");
        const factory = cont.get<LoggerFactory>("LoggerFactory");
        const logger = factory.fabricar("RegistrarDoacaoController");

        return new RegistrarDoacaoController({
            useCase,
            logger
        });
    });
};

export { configurarDependencias };
