import { IdBase, IdException } from "@/dominio/abstracoes/base.identity";

type NewIdDoacaoParams = {
    valor: string;
};
type InstanciarIdDoacaoParams = {
    valor?: string;
};

class IdDoacao extends IdBase<string> {

    public constructor(params: NewIdDoacaoParams) {
        super(params.valor);
    }

    public static instanciar(params: InstanciarIdDoacaoParams): IdDoacao {
        const { valor } = params;

        if(!valor)
            throw new IdException("O valor do identificador da doacao deve ser preenchido.");

        return new IdDoacao({ valor });
    }
}

export { IdDoacao };
