import { IdItemDemandaDoacao } from "@/dominio/demanda/identificadores/id-item-demanda.identity";

type NewItemDemandaDoacaoParams = {
    id: IdItemDemandaDoacao;
    nome: string;
    unidadeMedida: string;
    quantidadeMaxima?: number;
};

class ItemDemandaDoacao {

    private readonly _id: IdItemDemandaDoacao;
    private readonly _nome: string;
    private readonly _unidadeMedida: string;
    private readonly _quantidadeMaxima?: number;

    public constructor(params: NewItemDemandaDoacaoParams) {
        this._id = params.id;
        this._nome = params.nome;
        this._unidadeMedida = params.unidadeMedida;
        this._quantidadeMaxima = params.quantidadeMaxima!;
    }

    public get id(): IdItemDemandaDoacao {
        return this._id;
    }

    public get nome(): string {
        return this._nome;
    }

    public get unidadeMedida(): string {
        return this._unidadeMedida;
    }

    public get quantidadeMaxima(): number | undefined {
        return this._quantidadeMaxima;
    }

    public toString(): string {
        const atributos = [
            `id=${this._id}`,
            `nome=${this._nome}`,
            `unidadeMedida=${this._unidadeMedida}`,
            `quantidadeMaxima=${this._quantidadeMaxima}`
        ];

        return `ItemDoacaoDemanda(${atributos.join(", ")})`;
    }
}

export { ItemDemandaDoacao };
