import { IdBase, IdException } from "@/dominio/abstracoes/base.identity";

type NewIdDemandaDoacaoParams = {
    valor: string;
};
type InstanciarIdDemandaDoacaoParams = {
    valor?: string;
};

class IdDemandaDoacao extends IdBase<string> {

    public constructor(params: NewIdDemandaDoacaoParams) {
        super(params.valor);
    }

    public static instanciar(params: InstanciarIdDemandaDoacaoParams): IdDemandaDoacao {
        const { valor } = params;

        if(!valor)
            throw new IdException("O valor do identificador da demanda de doacao deve ser preenchido.");

        return new IdDemandaDoacao({ valor });
    }
}

export { IdDemandaDoacao };
