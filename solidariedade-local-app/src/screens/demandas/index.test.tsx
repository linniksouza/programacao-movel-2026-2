import { useNavigation } from "@react-navigation/native";
import { render } from "@testing-library/react-native";

import { DemandasScreen } from ".";

const demanda = {
    id: "1",
    nomeInstituicao: "Lar Esperança",
    necessidadesInstituicao: "Alimentos não perecíveis",
    itensDoacao: "Arroz, feijão, óleo e açúcar",
    localizacaoInstituicao: "Compensa",
    imagemInstituicao: "https://plus.unsplash.com/premium_vector-1724665300883-3af06a418d3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
};
const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn()
}));
jest.mock("@/data/api/buscar-demandas", () => ({
    buscarDemandas: () => [demanda]
}));

describe("Suite de testes de unidade para validar a tela 'DemandasScreen'", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.mocked(useNavigation).mockReturnValue({ navigate: mockNavigate });
    });

    it("Deve renderizar os componentes de UI corretamente", async () => {
        const {
            getByPlaceholderText,
            getByText
        } = await render(<DemandasScreen />);

        // Assert
        expect(getByText("Olá, Linnik!")).toBeTruthy();
        expect(getByText("Veja as necessidades de hoje")).toBeTruthy();
        expect(getByPlaceholderText("Buscar demandas...")).toBeTruthy();
        expect(getByText("Filtros")).toBeTruthy();
        expect(getByText("Demandas")).toBeTruthy();
        expect(getByText(demanda.nomeInstituicao)).toBeTruthy();
        expect(getByText(demanda.necessidadesInstituicao)).toBeTruthy();
        expect(getByText(demanda.itensDoacao)).toBeTruthy();
        expect(getByText(demanda.localizacaoInstituicao)).toBeTruthy();
    });
});
