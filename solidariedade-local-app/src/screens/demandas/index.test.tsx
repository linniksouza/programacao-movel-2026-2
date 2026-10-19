import { useNavigation } from "@react-navigation/native";

import { buscarDemandas } from "@/data/api/demandas";
import { Demanda } from "@/data/models/demanda.model";
import { render } from "@/utils/test-utils";
import { DemandasScreen } from ".";

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
    }
];
const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn()
}));
jest.mock("@/data/api/demandas", () => ({
    buscarDemandas: jest.fn()
}));

describe("Suite de testes de unidade para validar a tela 'DemandasScreen'", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        jest.mocked(useNavigation).mockReturnValue({ navigate: mockNavigate });
        jest.mocked(buscarDemandas).mockReturnValue(demandas);
    });

    it("Deve renderizar os componentes de UI corretamente", async () => {
        const {
            getByPlaceholderText,
            getByText
        } = await render(<DemandasScreen />);

        expect(getByText("Olá, Linnik!")).toBeTruthy();
        expect(getByText("Veja as necessidades de hoje")).toBeTruthy();
        expect(getByPlaceholderText("Buscar demandas...")).toBeTruthy();
        expect(getByText("Filtros")).toBeTruthy();
        expect(getByText("Demandas")).toBeTruthy();
        for(const demanda of demandas){
            expect(getByText(demanda.instituicao.nome)).toBeTruthy();
            expect(getByText(demanda.necessidadesInstituicao)).toBeTruthy();
            expect(
                getByText(
                    demanda.itensDoacao.slice(0, 1).map(i => i.nome).join(", ")
                )
            ).toBeTruthy();
            expect(getByText(demanda.instituicao.localizacao)).toBeTruthy();
        }
    });
});
