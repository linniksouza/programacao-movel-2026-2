import { useNavigation } from "@react-navigation/native";
import { DateTime } from "luxon";

import { buscarDemandas } from "@/data/api/demandas";
import { Demanda } from "@/data/models/demanda.model";
import { render } from "@/utils/test-utils";
import { DemandasScreen } from ".";

const dataPostagem = DateTime.now().minus({ days: 3 });
const demandas: Demanda[] = [
    {
        id: "1",
        necessidades: "Alimentos não perecíveis",
        data_postagem: dataPostagem.toISO(),
        instituicao: {
            cnpj: "1",
            nome: "Lar Esperança",
            localizacao: "Compensa",
            imagem_principal: "https://plus.unsplash.com/premium_vector-1724665300883-3af06a418d3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
        },
            itens: [
                {
                id: "1",
                nome: "Arroz",
                unidade_medida: "Kg"
            },
            {
                id: "2",
                nome: "Feijão",
                unidade_medida: "Kg"
            },
            {
                id: "3",
                nome: "Óleo",
                unidade_medida: "Garrafa"
            },
            {
                id: "4",
                nome: "Açúcar",
                unidade_medida: "Kg"
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
        jest.mocked(buscarDemandas).mockResolvedValue(demandas);
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
            expect(getByText(demanda.necessidades)).toBeTruthy();
            expect(
                getByText(
                    demanda.itens.slice(0, 1).map(i => i.nome).join(", ")
                )
            ).toBeTruthy();
            expect(getByText(demanda.instituicao.localizacao)).toBeTruthy();
        }
    });
});
