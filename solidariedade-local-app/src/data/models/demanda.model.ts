import { Instituicao } from "./instituicao.model";

interface ItemDoacaoDemanda {
    id: string;
    nome: string;
    unidade_medida: string;
    quantidade_maxima?: number;
}

interface Demanda {
    id: string;
    necessidades: string;
    data_postagem: string;
    itens: ItemDoacaoDemanda[];
    instituicao: Pick<Instituicao, "cnpj" | "nome" | "localizacao" | "imagem_principal">;
}

export { Demanda, ItemDoacaoDemanda };
