interface NovoItemDoacaoDTO {
    nome: string;
    unidade_medida: string;
    quantidade: number;
}

interface NovaDoacaoDTO {
    cpf_doador: string;
    id_demanda: string;
    observacoes?: string;
    itens: NovoItemDoacaoDTO[];
}

export {
    NovaDoacaoDTO,
    NovoItemDoacaoDTO
};
