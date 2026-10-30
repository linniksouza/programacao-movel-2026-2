import { CnpjInstituicao } from "@/dominio/instituicao/identificadores/cnpj-instituicao.identity";

type NewInstituicaoParams = {
    cnpj: CnpjInstituicao;
    nome: string;
    biografia: string;
    localizacao: string;
    areasAtuacao: string[];
    enderecoSite: string;
    imagemPrincipal: string;
    imagemCapa: string;
};

class Instituicao {

    private _cnpj: CnpjInstituicao;
    private _nome: string;
    private _biografia: string;
    private _localizacao: string;
    private _areasAtuacao: string[];
    private _enderecoSite: string;
    private _imagemPrincipal: string;
    private _imagemCapa: string;

    public constructor(params: NewInstituicaoParams) {
        this._cnpj = params.cnpj;
        this._nome = params.nome;
        this._biografia = params.biografia;
        this._localizacao = params.localizacao;
        this._areasAtuacao = params.areasAtuacao;
        this._enderecoSite = params.enderecoSite;
        this._imagemPrincipal = params.imagemPrincipal;
        this._imagemCapa = params.imagemCapa;
    }

    public get cnpj(): CnpjInstituicao {
        return this._cnpj;
    }

    public get nome(): string {
        return this._nome;
    }

    public get biografia(): string {
        return this._biografia;
    }

    public get localizacao(): string {
        return this._localizacao;
    }

    public get areasAtuacao(): string[] {
        return this._areasAtuacao;
    }

    public get enderecoSite(): string {
        return this._enderecoSite;
    }

    public get imagemPrincipal(): string {
        return this._imagemPrincipal;
    }

    public get imagemCapa(): string {
        return this._imagemCapa;
    }

    public toString(): string {
        const atributos = [
            `cnpj=${this._cnpj}`,
            `nome=${this._nome}`,
            `biografia=${this._biografia}`,
            `localizacao=${this._localizacao}`,
            `areasAtuacao=${this._areasAtuacao}`,
            `enderecoSite=${this._enderecoSite}`,
            `imagemPrincipal=${this._imagemPrincipal}`,
            `imagemCapa=${this._imagemCapa}`
        ];

        return `Instituicao(${atributos.join(", ")})`;
    }
}

export { Instituicao };
