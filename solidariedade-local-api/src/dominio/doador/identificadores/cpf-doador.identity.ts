import { IdBase, IdException } from "@/dominio/abstracoes/base.identity";

type NewCpfDoadorParams = {
    valor: string;
};
type InstanciarCpfDoadorParams = {
    valor: string;
};

class CpfDoador extends IdBase<string> {

    public constructor(params: NewCpfDoadorParams) {
        super(params.valor);
    }

    public static instanciar(params: InstanciarCpfDoadorParams): CpfDoador {
        const { valor } = params;

        if(!valor)
            throw new IdException("O valor do CPF do doador deve ser preenchido.");

        return new CpfDoador({ valor });
    }
}

export { CpfDoador };
