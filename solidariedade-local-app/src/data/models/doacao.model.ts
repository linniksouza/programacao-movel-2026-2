import { DateTime } from "luxon";

interface ItemDoacao {
    id?: string;
    nome: string;
    unidadeMedida: string;
    quantidade: number;
}

interface Doacao {
    id?: string;
    tipoDoacao: string;
    itensDoacao: ItemDoacao[];
    observacoes?: string;
    idInstituicao: string;
    nomeInstituicao: string;
    idDoador: string;
    nomeDoador: string;
    emailDoador: string;
    dataHoraDoacao: DateTime;
}

export { Doacao, ItemDoacao };
