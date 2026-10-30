import { IdBase, IdException } from "@/dominio/abstracoes/base.identity";

type NewIdItemDemandaDoacaoParams = {
    valor: string;
};
type InstanciarIdItemDemandaDoacaoParams = {
    valor?: string;
};

class IdItemDemandaDoacao extends IdBase<string> {

    public constructor(params: NewIdItemDemandaDoacaoParams) {
        super(params.valor);
    }

    public static instanciar(params: InstanciarIdItemDemandaDoacaoParams): IdItemDemandaDoacao {
        const { valor } = params;

        if(!valor)
            throw new IdException("O valor do identificador do item da demanda de doacao deve ser preenchido.");

        return new IdItemDemandaDoacao({ valor });
    }
}

export { IdItemDemandaDoacao };
