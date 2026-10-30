import { IdItemDoacao } from "@/dominio/doacao/identificadores/id-item-doacao.identity";

type NewItemDoacaoParams = {
    id: IdItemDoacao;
    nome: string;
    unidadeMedida: string;
    quantidade: number;
};

class ItemDoacao {

    private readonly _id: IdItemDoacao;
    private readonly _nome: string;
    private readonly _unidadeMedida: string;
    private readonly _quantidade: number;

    public constructor(params: NewItemDoacaoParams) {
        this._id = params.id;
        this._nome = params.nome;
        this._unidadeMedida = params.unidadeMedida;
        this._quantidade = params.quantidade;
    }

    public get id(): IdItemDoacao {
        return this._id;
    }

    public get nome(): string {
        return this._nome;
    }

    public get unidadeMedida(): string {
        return this._unidadeMedida;
    }

    public get quantidade(): number {
        return this._quantidade;
    }

    public toString(): string {
        const atributos = [
            `id=${this._id}`,
            `nome=${this._nome}`,
            `unidadeMedida=${this._unidadeMedida}`,
            `quantidade=${this._quantidade}`
        ];

        return `ItemDoacao(${atributos.join(", ")})`;
    }
}

export { ItemDoacao };
