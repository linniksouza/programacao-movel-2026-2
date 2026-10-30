import { StatusDoacao } from "@/dominio/doacao/enumeradores/status-doacao.enum";

interface DemandaDoacaoFeitaDTO {
    id: string;
    necessidades: string;
    instituicao: string;
    imagemInstituicao: string;
    localizacao: string;
}

interface ItemDoacaoDTO {
    id: string;
    nome: string;
    unidade_medida: string;
    quantidade: number;
}

interface DoacaoDTO {
    id: string;
    status_doacao: StatusDoacao;
    data_hora_doacao: string;
    observacoes?: string;
    itens: ItemDoacaoDTO[];
    demanda: DemandaDoacaoFeitaDTO;
}

export {
    DemandaDoacaoFeitaDTO,
    DoacaoDTO,
    ItemDoacaoDTO
};
