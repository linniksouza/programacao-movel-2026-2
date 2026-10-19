import { useNavigation } from "@react-navigation/native";

import { Demanda } from "@/data/models/demanda.model";
import { fireEvent, render } from "@/utils/test-utils";
import { ListaDemandas } from ".";

const demandas: Demanda[] = [
    {
        id: "1",
        necessidadesInstituicao: "Alimentos não perecíveis",
        instituicao: {
            id: "1",
            nome: "Lar Esperança",
            localizacao: "Compensa",
            imagemPrincipal: "https://plus.unsplash.com/premium_vector-1724665300883-3af06a418d3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
        },
        itensDoacao: [
            {
                nome: "Arroz",
                unidadeMedida: "Kg"
            },
            {
                nome: "Feijão",
                unidadeMedida: "Kg"
            },
            {
                nome: "Óleo",
                unidadeMedida: "Garrafa"
            },
            {
                nome: "Açúcar",
                unidadeMedida: "Kg"
            }
        ]
    },
    {
        id: "2",
        necessidadesInstituicao: "Produtos de higiene pessoal",
        instituicao: {
            id: "1",
            nome: "Abrigo São Vicente",
            localizacao: "Centro",
            imagemPrincipal: "https://images.unsplash.com/photo-1593113598332-cd288d649433?fm=jpg&q=60&w=3000&auto=format&fit=crop"
        },
        itensDoacao: [
            {
                nome: "Sabonete",
                unidadeMedida: "Unidade"
            },
            {
                nome: "Creme dental",
                unidadeMedida: "Unidade"
            },
            {
                nome: "Shampoo",
                unidadeMedida: "Frasco"
            },
            {
                nome: "Fralda Geriátrica",
                unidadeMedida: "Pacote"
            },
        ]
    },
    {
        id: "3",
        necessidadesInstituicao: "Material escolar e pedagógico",
        instituicao: {
            id: "3",
            nome: "Casa da Criança e do Adolescente",
            localizacao: "Cidade Nova",
            imagemPrincipal: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?fm=jpg&q=60&w=3000&auto=format&fit=crop"
        },
        itensDoacao: [
            {
                nome: "Caderno",
                unidadeMedida: "Unidade"
            },
            {
                nome: "Lápis de cor",
                unidadeMedida: "Caixa"
            },
            {
                nome: "Mochila escolar",
                unidadeMedida: "Unidade"
            },
            {
                nome: "Folhas de papelç A4",
                unidadeMedida: "Resma"
            },
        ]
    },
    {
        id: "4",
        necessidadesInstituicao: "Insumos para resgate animal",
        instituicao: {
            id: "4",
            nome: "Instituto Ampara Pet",
            localizacao: "Flores",
            imagemPrincipal: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?fm=jpg&q=60&w=3000&auto=format&fit=crop"
        },
        itensDoacao: [
            {
                nome: "Ração para cães e gatos",
                unidadeMedida: "10 Kg"
            },
            {
                nome: "Tapete higiênico",
                unidadeMedida: "Unidade"
            },
            {
                nome: "Medicamentos",
                unidadeMedida: "Caixa"
            },
        ]
    },
    {
        id: "5",
        necessidadesInstituicao: "Materiais de limpeza",
        instituicao: {
            id: "5",
            nome: "Associação Pestalozzi",
            localizacao: "Parque Dez",
            imagemPrincipal: "https://plus.unsplash.com/premium_vector-1724665300883-3af06a418d3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
        },
        itensDoacao: [
            {
                nome: "Desinfetante",
                unidadeMedida: "Frasco"
            },
            {
                nome: "Sabão em pó",
                unidadeMedida: "Pacote"
            },
            {
                nome: "Água sanitária",
                unidadeMedida: "L"
            },
            {
                nome: "Detergente",
                unidadeMedida: "Frasco"
            },
        ]
    },
];
jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn()
}));
const mockNavigate = jest.fn();

describe("Suite de testes de unidade para validar o componente de UI 'ListaDemandas'", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.mocked(useNavigation).mockReturnValue({
            navigate: mockNavigate
        } as any);
    });

    it("Deve renderizar corretamente 5 cards de demanda quando forem passadas 5 demandas", async () => {
        const {
            getAllByTestId
        } = await render(
            <ListaDemandas demandas={demandas} />
        );

        expect(getAllByTestId("container-card-demanda")).toHaveLength(demandas.length);
    });

    it("Deve navegar para a tela de registro de doacao ao selecionar uma demanda", async () => {
        const demanda = demandas[0];

        const { getByText } = await render(<ListaDemandas demandas={demandas} />);
        fireEvent.press(getByText(demanda.instituicao.nome));

        expect(mockNavigate).toHaveBeenCalledWith("RegistrarDoacao", { idDemanda: demanda.id });
    });
});
