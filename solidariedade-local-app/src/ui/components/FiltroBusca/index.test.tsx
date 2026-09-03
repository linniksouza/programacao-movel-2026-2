import { fireEvent, render } from "@testing-library/react-native";

import { FiltroBusca } from ".";

describe("Suite de testes de unidade para validar o componente de UI 'FiltroBusca'", () => {
    it("Deve renderizar a barra de busca e o botao de filtros corretamente", async () => {
        const { getByPlaceholderText, getByText } = await render(<FiltroBusca />);

        expect(getByPlaceholderText("Buscar demandas...")).toBeTruthy();
        expect(getByText("Filtros")).toBeTruthy();
    });

    it("Deve atualizar o valor do campo de texto quando o usuário digitar", async () => {
        const { getByTestId } = await render(<FiltroBusca />);

        const input = getByTestId("input-buscar-demandas");
        await fireEvent.changeText(input, "Alimentos");

        expect(input.props.value).toBe("Alimentos");
    });
});
