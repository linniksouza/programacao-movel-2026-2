import { fireEvent, render } from "@testing-library/react-native";

import { Demanda } from "@/data/models/demanda.model";
import { CardDemanda } from ".";

const demanda: Demanda = {
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
};
const onPress = jest.fn();

describe("Suite de testes de unidade para validar o componente de UI 'CardDemanda'", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Deve renderizar as informacoes textuais da demanda corretamente", async () => {
        const { getByText } = await render(
            <CardDemanda demanda={demanda} onPress={onPress} />
        );

        expect(getByText(demanda.instituicao.nome)).toBeTruthy();
        expect(getByText(demanda.necessidadesInstituicao)).toBeTruthy();
        expect(getByText(demanda.itensDoacao[0].nome)).toBeTruthy();
        expect(getByText(demanda.instituicao.localizacao)).toBeTruthy();
    });

    it("Deve detectar o evento de area do card pressionado", async () => {
        const { getByTestId } = await render(
            <CardDemanda demanda={demanda} onPress={onPress} />
        );

        fireEvent.press(
            getByTestId("container-card-demanda")
        );

        expect(onPress).toHaveBeenCalledTimes(1);
    });
});
