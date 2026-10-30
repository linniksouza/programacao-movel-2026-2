import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { InstituicaoDTO } from "@/aplicacao/instituicao/dto/instituicao.dto";
import { NovaInstituicaoDTO } from "@/aplicacao/instituicao/dto/nova-instituicao.dto";
import { Instituicao } from "@/dominio/instituicao/entidades/instituicao.entity";
import { CnpjInstituicao } from "@/dominio/instituicao/identificadores/cnpj-instituicao.identity";
import { InstituicoesRepository } from "@/dominio/instituicao/repositorios/instituicoes.repository";

type NewCadastrarInstituicaoParams = {
    repository: InstituicoesRepository;
    instituicaoMapper: ObjectMapper<Instituicao, InstituicaoDTO>;
};
type CadastrarInstituicaoInput = {
    dto: NovaInstituicaoDTO;
};
type CadastrarInstituicaoOutput = {
    dto: InstituicaoDTO;
};

class CadastrarInstituicao {

    private readonly _repository: InstituicoesRepository;

    private readonly _instituicaoMapper: ObjectMapper<Instituicao, InstituicaoDTO>;

    public constructor(params: NewCadastrarInstituicaoParams) {
        this._repository = params.repository;
        this._instituicaoMapper = params.instituicaoMapper;
    }

    public async executar(input: CadastrarInstituicaoInput): Promise<CadastrarInstituicaoOutput> {
        const { dto } = input;

        const instituicao = new Instituicao({
            cnpj: CnpjInstituicao.instanciar({ valor: dto.cnpj }),
            nome: dto.nome,
            biografia: dto.biografia,
            localizacao: dto.localizacao,
            areasAtuacao: dto.areas_atuacao,
            enderecoSite: dto.endereco_site,
            imagemPrincipal: dto.imagem_principal,
            imagemCapa: dto.imagem_capa
        });
        await this._repository.salvarInstituicao(instituicao);

        return {
            dto: await this._instituicaoMapper.mapear(instituicao)
        };
    }
}

export { CadastrarInstituicao };
