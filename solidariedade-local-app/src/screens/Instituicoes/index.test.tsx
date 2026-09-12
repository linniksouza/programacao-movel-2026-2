import { render } from "@testing-library/react-native";

import { InstituicoesScreen } from ".";

const demandas = [
    {
        id: "1",
        nomeInstituicao: "Lar Esperança",
        necessidadesInstituicao: "Alimentos não perecíveis",
        itensDoacao: "Arroz, feijão, óleo e açúcar",
        localizacaoInstituicao: "Compensa",
        imagemInstituicao: "https://plus.unsplash.com/premium_vector-1724665300883-3af06a418d3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
    }
];
jest.mock("@/data/api/buscar-demandas", () => ({
    buscarDemandas: () => [...demandas]
}));

describe("Suite de testes de unidade para validar a tela 'InstituicoesScreen'", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Deve renderizar uma instituição para cada demanda recebida", async () => {
        const { getAllByTestId } = await render(<InstituicoesScreen />);

        expect(getAllByTestId("card-instituicao")).toHaveLength(demandas.length);
    });

    it("Deve renderizar corretamente os dados das instituicoes", async () => {
        const { getByText } = await render(<InstituicoesScreen />);

        demandas.forEach((demanda) => {
            expect(getByText(demanda.nomeInstituicao)).toBeTruthy();
            expect(getByText(demanda.localizacaoInstituicao)).toBeTruthy();
        });
    });
});
