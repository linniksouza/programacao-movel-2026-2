import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { InstituicaoDTO } from "@/aplicacao/instituicao/dto/instituicao.dto";
import { Instituicao } from "@/dominio/instituicao/entidades/instituicao.entity";
import { InstituicoesRepository } from "@/dominio/instituicao/repositorios/instituicoes.repository";

type NewBuscarInstituicoesParams = {
    repository: InstituicoesRepository;
    instituicaoMapper: ObjectMapper<Instituicao, InstituicaoDTO>;
};
type BuscarInstituicoesOutput = {
    loteDto: InstituicaoDTO[];
};

class BuscarInstituicoes {

    private readonly _repository: InstituicoesRepository;

    private readonly _instituicaoMapper: ObjectMapper<Instituicao, InstituicaoDTO>;
    
    public constructor(params: NewBuscarInstituicoesParams) {
        this._repository = params.repository;
        this._instituicaoMapper = params.instituicaoMapper;
    }

    public async executar(): Promise<BuscarInstituicoesOutput> {
        const instituicoes = await this._repository.buscarInstituicoes();
        const loteDto = await this._instituicaoMapper.mapearLista(instituicoes);

        return { loteDto };
    }
}

export { BuscarInstituicoes };
