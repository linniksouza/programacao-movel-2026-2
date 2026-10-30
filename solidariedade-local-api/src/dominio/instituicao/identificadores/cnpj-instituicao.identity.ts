import { IdBase, IdException } from "@/dominio/abstracoes/base.identity";

type NewCnpjInstituicaoParams = {
    valor: string;
};
type InstanciarCnpjInstituicaoParams = {
    valor: string;
};

class CnpjInstituicao extends IdBase<string> {

    public constructor(params: NewCnpjInstituicaoParams) {
        super(params.valor);
    }

    public static instanciar(params: InstanciarCnpjInstituicaoParams): CnpjInstituicao {
        const { valor } = params;

        if(!valor)
            throw new IdException("O valor do CNPJ da instituicao deve ser preenchido.");

        return new CnpjInstituicao({ valor });
    }
}

export { CnpjInstituicao };
