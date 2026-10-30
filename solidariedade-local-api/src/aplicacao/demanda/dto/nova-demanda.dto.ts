interface NovoItemDemandaDoacaoDTO {
    nome: string;
    unidade_medida: string;
    quantidade_maxima?: number;
}

interface NovaDemandaDoacaoDTO {
    necessidades: string;
    cnpj_instituicao: string;
    itens: NovoItemDemandaDoacaoDTO[];
}

export { NovaDemandaDoacaoDTO, NovoItemDemandaDoacaoDTO };
