import { Demanda } from "@/data/models/demanda.mode";

const demandas = [
    {
        id: "1",
        nomeInstituicao: "Lar Esperança",
        necessidadesInstituicao: "Alimentos não perecíveis",
        itensDoacao: "Arroz, feijão, óleo e açúcar",
        localizacaoInstituicao: "Compensa",
        imagemInstituicao: "https://plus.unsplash.com/premium_vector-1724665300883-3af06a418d3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
    },
    {
        id: "2",
        nomeInstituicao: "Abrigo São Vicente",
        necessidadesInstituicao: "Produtos de higiene pessoal",
        itensDoacao: "Sabonete, creme dental, shampoo e fraldas geriátricas",
        localizacaoInstituicao: "Centro",
        imagemInstituicao: "https://images.unsplash.com/photo-1593113598332-cd288d649433?fm=jpg&q=60&w=3000&auto=format&fit=crop"
    },
    {
        id: "3",
        nomeInstituicao: "Casa da Criança e do Adolescente",
        necessidadesInstituicao: "Material escolar e pedagógico",
        itensDoacao: "Cadernos, lápis de cor, mochilas e folhas A4",
        localizacaoInstituicao: "Cidade Nova",
        imagemInstituicao: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?fm=jpg&q=60&w=3000&auto=format&fit=crop"
    },
    {
        id: "4",
        nomeInstituicao: "Instituto Ampara Pet",
        necessidadesInstituicao: "Insumos para resgate animal",
        itensDoacao: "Ração para cães e gatos, tapetes higiênicos e medicamentos",
        localizacaoInstituicao: "Flores",
        imagemInstituicao: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?fm=jpg&q=60&w=3000&auto=format&fit=crop"
    },
    {
        id: "5",
        nomeInstituicao: "Associação Pestalozzi",
        necessidadesInstituicao: "Materiais de limpeza",
        itensDoacao: "Desinfetante, sabão em pó, água sanitária e detergente",
        localizacaoInstituicao: "Parque Dez",
        imagemInstituicao: "https://plus.unsplash.com/premium_vector-1724665300883-3af06a418d3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
    },
    {
        id: "6",
        nomeInstituicao: "Rede Feminina de Combate ao Câncer",
        necessidadesInstituicao: "Suplementos e roupas",
        itensDoacao: "Leite em pó, suplementos alimentares e agasalhos",
        localizacaoInstituicao: "Adrianópolis",
        imagemInstituicao: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?fm=jpg&q=60&w=3000&auto=format&fit=crop"
    },
    {
        id: "7",
        nomeInstituicao: "Projeto Curumim",
        necessidadesInstituicao: "Brinquedos e jogos educativos",
        itensDoacao: "Bola de futebol, jogos de tabuleiro, bonecas e carrinhos",
        localizacaoInstituicao: "Aleixo",
        imagemInstituicao: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?fm=jpg&q=60&w=3000&auto=format&fit=crop"
    },
    {
        id: "8",
        nomeInstituicao: "Albergue Noturno Manaus",
        necessidadesInstituicao: "Roupas de cama e banho",
        itensDoacao: "Lençóis, travesseiros, cobertor e toalhas de banho",
        localizacaoInstituicao: "Praça 14",
        imagemInstituicao: "https://images.unsplash.com/photo-1593113598332-cd288d649433?fm=jpg&q=60&w=3000&auto=format&fit=crop"
    },
    {
        id: "9",
        nomeInstituicao: "GACC - Grupo de Apoio à Criança com Câncer",
        necessidadesInstituicao: "Cesta básica e proteínas",
        itensDoacao: "Cestas básicas, latas de leite e alimentos perecíveis (carne/frango)",
        localizacaoInstituicao: "Dom Pedro",
        imagemInstituicao: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?fm=jpg&q=60&w=3000&auto=format&fit=crop"
    },
    {
        id: "10",
        nomeInstituicao: "Lar dos Idosos São Vicente de Paulo",
        necessidadesInstituicao: "Cuidados especiais de saúde",
        itensDoacao: "Luvas descartáveis, gaze, álcool 70% e fraldas geriátricas GG",
        localizacaoInstituicao: "São Raimundo",
        imagemInstituicao: "https://plus.unsplash.com/premium_vector-1724665300883-3af06a418d3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
    }
];

const buscarDemanda = (id: string): Demanda | undefined => {
    return demandas.find((d) => d.id === id);
};

const buscarDemandas = (): Demanda[] => {
    return [...demandas];
};

const buscarDemandasAgrupadas = (): { title: string, data: Demanda[] }[] => {
    return [
        {
            title: "Alimentação e Nutrição",
            data: [
                {
                    id: "1",
                    nomeInstituicao: "Lar Esperança",
                    necessidadesInstituicao: "Alimentos não perecíveis",
                    itensDoacao: "Arroz, feijão, óleo e açúcar",
                    localizacaoInstituicao: "Compensa",
                    imagemInstituicao: "https://plus.unsplash.com/premium_vector-1724665300883-3af06a418d3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
                },
                {
                    id: "9",
                    nomeInstituicao: "GACC - Grupo de Apoio à Criança com Câncer",
                    necessidadesInstituicao: "Cesta básica e proteínas",
                    itensDoacao: "Cestas básicas, latas de leite e alimentos perecíveis (carne/frango)",
                    localizacaoInstituicao: "Dom Pedro",
                    imagemInstituicao: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                }
            ]
        },
        {
            title: "Saúde, Higiene e Cuidados Especiais",
            data: [
                {
                    id: "2",
                    nomeInstituicao: "Abrigo São Vicente",
                    necessidadesInstituicao: "Produtos de higiene pessoal",
                    itensDoacao: "Sabonete, creme dental, shampoo e fraldas geriátricas",
                    localizacaoInstituicao: "Centro",
                    imagemInstituicao: "https://images.unsplash.com/photo-1593113598332-cd288d649433?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                },
                {
                    id: "6",
                    nomeInstituicao: "Rede Feminina de Combate ao Câncer",
                    necessidadesInstituicao: "Suplementos e roupas",
                    itensDoacao: "Leite em pó, suplementos alimentares e agasalhos",
                    localizacaoInstituicao: "Adrianópolis",
                    imagemInstituicao: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                },
                {
                    id: "10",
                    nomeInstituicao: "Lar dos Idosos São Vicente de Paulo",
                    necessidadesInstituicao: "Cuidados especiais de saúde",
                    itensDoacao: "Luvas descartáveis, gaze, álcool 70% e fraldas geriátricas GG",
                    localizacaoInstituicao: "São Raimundo",
                    imagemInstituicao: "https://plus.unsplash.com/premium_vector-1724665300883-3af06a418d3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
                }
            ]
        },
        {
            title: "Educação, Cultura e Lazer",
            data: [
                {
                    id: "3",
                    nomeInstituicao: "Casa da Criança e do Adolescente",
                    necessidadesInstituicao: "Material escolar e pedagógico",
                    itensDoacao: "Cadernos, lápis de cor, mochilas e folhas A4",
                    localizacaoInstituicao: "Cidade Nova",
                    imagemInstituicao: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                },
                {
                    id: "7",
                    nomeInstituicao: "Projeto Curumim",
                    necessidadesInstituicao: "Brinquedos e jogos educativos",
                    itensDoacao: "Bola de futebol, jogos de tabuleiro, bonecas e carrinhos",
                    localizacaoInstituicao: "Aleixo",
                    imagemInstituicao: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                }
            ]
        },
        {
            title: "Causa Animal",
            data: [
                {
                    id: "4",
                    nomeInstituicao: "Instituto Ampara Pet",
                    necessidadesInstituicao: "Insumos para resgate animal",
                    itensDoacao: "Ração para cães e gatos, tapetes higiênicos e medicamentos",
                    localizacaoInstituicao: "Flores",
                    imagemInstituicao: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                }
            ]
        },
        {
            title: "Limpeza e Infraestrutura",
            data: [
                {
                    id: "5",
                    nomeInstituicao: "Associação Pestalozzi",
                    necessidadesInstituicao: "Materiais de limpeza",
                    itensDoacao: "Desinfetante, sabão em pó, água sanitária e detergente",
                    localizacaoInstituicao: "Parque Dez",
                    imagemInstituicao: "https://plus.unsplash.com/premium_vector-1724665300883-3af06a418d3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
                },
                {
                    id: "8",
                    nomeInstituicao: "Albergue Noturno Manaus",
                    necessidadesInstituicao: "Roupas de cama e banho",
                    itensDoacao: "Lençóis, travesseiros, cobertor e toalhas de banho",
                    localizacaoInstituicao: "Praça 14",
                    imagemInstituicao: "https://images.unsplash.com/photo-1593113598332-cd288d649433?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                }
            ]
        }
    ];
};

export {
    buscarDemanda,
    buscarDemandas,
    buscarDemandasAgrupadas
};
