import { InstituicaoDTO } from "@/aplicacao/instituicao/dto/instituicao.dto";
import { StatusDemandaDoacao } from "@/dominio/demanda/enumeradores/status-demanda.enum";

interface ItemDemandaDoacaoDTO {
    id: string;
    nome: string;
    unidade_medida: string;
    quantidade_maxima?: number;
}

interface DemandaDoacaoDTO {
    id: string;
    necessidades: string;
    status: StatusDemandaDoacao;
    data_postagem: string;
    itens: ItemDemandaDoacaoDTO[];
    instituicao: InstituicaoDTO;
}

export { DemandaDoacaoDTO, ItemDemandaDoacaoDTO };
