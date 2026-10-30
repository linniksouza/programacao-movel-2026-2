import { IdBase, IdException } from "@/dominio/abstracoes/base.identity";

type NewIdItemDoacaoParams = {
    valor: string;
};
type InstanciarIdItemDoacaoParams = {
    valor?: string;
};

class IdItemDoacao extends IdBase<string> {

    public constructor(params: NewIdItemDoacaoParams) {
        super(params.valor);
    }

    public static instanciar(params: InstanciarIdItemDoacaoParams): IdItemDoacao {
        const { valor } = params;

        if(!valor)
            throw new IdException("O valor do identificador do item da doacao deve ser preenchido.");

        return new IdItemDoacao({ valor });
    }
}

export { IdItemDoacao };
