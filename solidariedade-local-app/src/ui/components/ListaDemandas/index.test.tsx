import { useNavigation } from "@react-navigation/native";
import { fireEvent, render } from "@testing-library/react-native";

import { ListaDemandas } from ".";

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
        fireEvent.press(getByText(demanda.nomeInstituicao));

        expect(mockNavigate).toHaveBeenCalledWith("RegistrarDoacao", { idDemanda: demanda.id });
    });
});
