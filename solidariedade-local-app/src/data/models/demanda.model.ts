import { Instituicao } from "./instituicao.model";

interface ItemDoacaoDemanda {
    nome: string;
    unidadeMedida: string;
    qtdMaxima?: number;
}

interface Demanda {
    id: string;
    necessidadesInstituicao: string;
    itensDoacao: ItemDoacaoDemanda[];
    instituicao: Pick<Instituicao, "id" | "nome" | "localizacao" | "imagemPrincipal">;
}

export { Demanda, ItemDoacaoDemanda };
