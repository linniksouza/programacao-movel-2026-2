import { fireEvent, render } from "@testing-library/react-native";

import { FiltroBuscaInstituicao } from ".";

describe("Suite de testes de unidade para validar o componente de UI 'FiltroBuscaInstituicao'", () => {
    it("Deve renderizar a barra de busca e o botao de filtros corretamente", async () => {
        const { getByPlaceholderText } = await render(<FiltroBuscaInstituicao onFiltrarInstituicoes={jest.fn()} />);

        expect(getByPlaceholderText("Buscar instituições...")).toBeTruthy();
    });

    it("Deve atualizar o valor do campo de texto quando o usuário digitar", async () => {
        const { getByTestId } = await render(<FiltroBuscaInstituicao onFiltrarInstituicoes={jest.fn()} />);

        const input = getByTestId("input-buscar-instituicoes");
        await fireEvent.changeText(input, "Santa Casa de Misericórdia");

        expect(input.props.value).toBe("Santa Casa de Misericórdia");
    });
});
