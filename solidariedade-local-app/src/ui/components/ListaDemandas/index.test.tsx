import { useNavigation } from "@react-navigation/native";
import { DateTime } from "luxon";

import { Demanda } from "@/data/models/demanda.model";
import { fireEvent, render } from "@/utils/test-utils";
import { ListaDemandas } from ".";

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
jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn()
}));
const mockNavigate = jest.fn();
const mockOnRefresh = jest.fn();

describe("Suite de testes de unidade para validar o componente de UI 'ListaDemandas'", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.mocked(useNavigation).mockReturnValue({
            navigate: mockNavigate
        } as any);
    });

    it("Deve renderizar corretamente 1 cards de demanda quando forem passadas 5 demandas", async () => {
        const {
            getAllByTestId
        } = await render(
            <ListaDemandas
                demandas={demandas}
                refreshing={false}
                onRefresh={mockOnRefresh}
            />
        );

        expect(getAllByTestId("container-card-demanda")).toHaveLength(demandas.length);
    });

    it("Deve navegar para a tela de registro de doacao ao selecionar uma demanda", async () => {
        const demanda = demandas[0];

        const {
            getByText
        } = await render(
            <ListaDemandas
                demandas={demandas}
                refreshing={false}
                onRefresh={mockOnRefresh}
            />
        );

        await fireEvent.press(getByText(demanda.instituicao.nome));

        expect(mockNavigate).toHaveBeenCalledWith("RegistrarDoacao", { demanda });
    });
});
