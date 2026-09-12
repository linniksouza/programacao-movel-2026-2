import { fireEvent, render } from "@testing-library/react-native";

import { CardDemanda } from ".";

describe("Suite de testes de unidade para validar o componente de UI 'CardDemanda'", () => {
    const demanda = {
        id: "1",
        nomeInstituicao: "Lar Esperança",
        necessidadesInstituicao: "Alimentos não perecíveis",
        itensDoacao: "Arroz, feijão, óleo e açúcar",
        localizacaoInstituicao: "Compensa",
        imagemInstituicao: "https://plus.unsplash.com/premium_vector-1724665300883-3af06a418d3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
    };
    const onPress = jest.fn();

    it("Deve renderizar as informacoes textuais da demanda corretamente", async () => {
        const { getByText } = await render(
            <CardDemanda demanda={demanda} onPress={onPress} />
        );

        expect(getByText(demanda.nomeInstituicao)).toBeTruthy();
        expect(getByText(demanda.necessidadesInstituicao)).toBeTruthy();
        expect(getByText(demanda.itensDoacao)).toBeTruthy();
        expect(getByText(demanda.localizacaoInstituicao)).toBeTruthy();
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
