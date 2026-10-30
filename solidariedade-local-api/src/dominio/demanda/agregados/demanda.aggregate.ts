import { DateTime } from "luxon";

import { ItemDemandaDoacaoCollection } from "@/dominio/demanda/colecoes/item-demanda.collection";
import { Instituicao } from "@/dominio/instituicao/entidades/instituicao.entity";
import { StatusDemandaDoacao } from "@/dominio/demanda/enumeradores/status-demanda.enum";
import { IdDemandaDoacao } from "@/dominio/demanda/identificadores/id-demanda.identity";

type NewDemandaDoacaoParams = {
    id: IdDemandaDoacao;
    necessidades: string;
    status: StatusDemandaDoacao;
    dataPostagem: DateTime;
    itens: ItemDemandaDoacaoCollection;
    instituicao: Instituicao;
};

class DemandaDoacao {

    private readonly _id: IdDemandaDoacao;
    private readonly _necessidades: string;
    private readonly _status: StatusDemandaDoacao;
    private readonly _dataPostagem: DateTime;
    private readonly _itens: ItemDemandaDoacaoCollection;
    private readonly _instituicao: Instituicao;

    public constructor(params: NewDemandaDoacaoParams) {
        this._id = params.id;
        this._necessidades = params.necessidades;
        this._status = params.status;
        this._dataPostagem = params.dataPostagem;
        this._itens = params.itens;
        this._instituicao = params.instituicao;
    }

    public get id(): IdDemandaDoacao {
        return this._id;
    }

    public get necessidades(): string {
        return this._necessidades;
    }

    public get status(): StatusDemandaDoacao {
        return this._status;
    }

    public get dataPostagem(): DateTime {
        return this._dataPostagem;
    }

    public get itens(): ItemDemandaDoacaoCollection {
        return this._itens;
    }

    public get instituicao(): Instituicao {
        return this._instituicao;
    }

    public toString(): string {
        const atributos = [
            `id=${this._id}`,
            `necessidades=${this._necessidades}`,
            `status=${this._status}`,
            `dataPostagem=${this._dataPostagem.toISO()}`,
            `itens=${this._itens}`,
            `instituicao=${this._instituicao}`
        ];

        return `DemandaDoacao(${atributos.join(", ")})`;
    }
}

export { DemandaDoacao };
