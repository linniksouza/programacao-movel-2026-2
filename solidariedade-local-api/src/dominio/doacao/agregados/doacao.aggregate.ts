import { DateTime } from "luxon";

import { ItemDoacaoCollection } from "@/dominio/doacao/colecoes/item-doacao.collection";
import { Doador } from "@/dominio/doador/entidades/doador.entity";
import { StatusDoacao } from "@/dominio/doacao/enumeradores/status-doacao.enum";
import { IdDoacao } from "@/dominio/doacao/identificadores/id-doacao.identity";
import { DemandaDoacao } from "@/dominio/demanda/agregados/demanda.aggregate";

type NewDoacaoParams = {
    id: IdDoacao;
    statusDoacao: StatusDoacao;
    dataHoraDoacao: DateTime;
    observacoes?: string;
    demanda: DemandaDoacao;
    itens: ItemDoacaoCollection;
    doador: Doador;
};

class Doacao {

    private readonly _id: IdDoacao;
    private readonly _statusDoacao: StatusDoacao;
    private readonly _dataHoraDoacao: DateTime;
    private readonly _observacoes?: string;
    private readonly _demanda: DemandaDoacao;
    private readonly _itens: ItemDoacaoCollection;
    private readonly _doador: Doador;

    public constructor(params: NewDoacaoParams) {
        this._id = params.id;
        this._statusDoacao = params.statusDoacao;
        this._dataHoraDoacao = params.dataHoraDoacao;
        this._observacoes = params.observacoes!;
        this._demanda = params.demanda;
        this._itens = params.itens;
        this._doador = params.doador;
    }

    public get id(): IdDoacao {
        return this._id;
    }

    public get statusDoacao(): StatusDoacao {
        return this._statusDoacao;
    }

    public get dataHoraDoacao(): DateTime {
        return this._dataHoraDoacao;
    }

    public get observacoes(): string | undefined {
        return this._observacoes;
    }

    public get demanda(): DemandaDoacao {
        return this._demanda;
    }

    public get itens(): ItemDoacaoCollection {
        return this._itens;
    }

    public get doador(): Doador {
        return this._doador;
    }

    public toString(): string {
        const atributos = [
            `id=${this._id}`,
            `statusDoacao=${this._statusDoacao}`,
            `dataHoraDoacao=${this._dataHoraDoacao.toISO()}`,
            `observacoes=${this._observacoes}`,
            `demanda=${this._demanda}`,
            `itens=${this._itens}`,
            `doador=${this._doador}`
        ];

        return `Doacao(${atributos.join(", ")})`;
    }
}

export { Doacao };

