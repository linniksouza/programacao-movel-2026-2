import { DateTime } from "luxon";

interface NovoItemDoacao {
    nome: string;
    unidade_medida: string;
    quantidade: number;
}

interface NovaDoacao {
    cpf_doador: string;
    id_demanda: string;
    observacoes?: string;
    itens: NovoItemDoacao[];
}

enum StatusDoacao {
    PENDENTE = "PENDENTE",
    CONFIRMADA = "CONFIRMADA",
    REJEITADA = "REJEITADA"
}

interface DemandaDoacaoFeita {
    id: string;
    necessidades: string;
    instituicao: string;
    imagemInstituicao: string;
    localizacao: string;
}

interface ItemDoacao {
    id: string;
    nome: string;
    unidade_medida: string;
    quantidade: number;
}

interface Doacao {
    id: string;
    status_doacao: StatusDoacao;
    data_hora_doacao: string;
    observacoes?: string;
    itens: ItemDoacao[];
    demanda: DemandaDoacaoFeita;
}

interface ItemDoacaoLocal {
    id: string;
    nome: string;
    unidadeMedida: string;
    quantidade: number;
}

interface DoacaoLocal {
    id: string;
    tipoDoacao: string;
    itensDoacao: ItemDoacaoLocal[];
    observacoes?: string;
    idInstituicao: string;
    nomeInstituicao: string;
    cpfDoador: string;
    nomeDoador: string;
    emailDoador: string;
    dataHoraDoacao: DateTime;
}

export {
    DemandaDoacaoFeita,
    Doacao,
    DoacaoLocal,
    ItemDoacao,
    ItemDoacaoLocal,
    NovaDoacao,
    NovoItemDoacao,
    StatusDoacao
};
