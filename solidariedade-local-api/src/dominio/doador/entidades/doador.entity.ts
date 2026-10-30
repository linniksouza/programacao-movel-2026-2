import { OrigemContaDoador } from "@/dominio/doador/enumeradores/origem-conta.enum";
import { CpfDoador } from "@/dominio/doador/identificadores/cpf-doador.identity";

type NewDoadorParams = {
    cpf: CpfDoador;
    nome: string;
    email: string;
    origemConta: OrigemContaDoador;
    urlImagem?: string;
};

class Doador {

    private readonly _cpf: CpfDoador;
    private readonly _nome: string;
    private readonly _email: string;
    private readonly _origemConta: OrigemContaDoador;
    private readonly _urlImagem?: string;

    public constructor(params: NewDoadorParams) {
        this._cpf = params.cpf;
        this._nome = params.nome;
        this._email = params.email;
        this._origemConta = params.origemConta;
        this._urlImagem = params.urlImagem!;
    }

    public get cpf(): CpfDoador {
        return this._cpf;
    }

    public get nome(): string {
        return this._nome;
    }

    public get email(): string {
        return this._email;
    }

    public get origemConta(): OrigemContaDoador {
        return this._origemConta;
    }

    public get urlImagem(): string | undefined {
        return this._urlImagem;
    }

    public toString(): string {
        const atributos = [
            `cpf=${this._cpf}`,
            `nome=${this._nome}`,
            `email=${this._email}`,
            `origemConta=${this._origemConta}`,
            `urlImagem=${this._urlImagem}`
        ];

        return `Doador(${atributos.join(", ")})`;
    }
}

export { Doador };
