import { render } from "@testing-library/react-native";

import { Cabecalho } from ".";

jest.mock("react-native-paper", () => {
    const original = jest.requireActual("react-native-paper");

    return {
        ...original,
        useTheme: () => ({
            colors: {
                primary: "#c2c2c2"
            }
        })
    };
});

describe("Suite de testes de unidade para validar o componente de UI 'Cabecalho'", () => {
    it("Deve renderizar os textos de saudacao e orientacao corretamente", async () => {
        const { getByText } = await render(<Cabecalho />);

        expect(getByText("Olá, Linnik!")).toBeTruthy();
        expect(getByText("Veja as necessidades de hoje")).toBeTruthy();
    });

    it("Deve aplicar a cor primária do tema no fundo do cabeçalho", async () => {
        const { getByTestId } = await render(<Cabecalho />);
        const container = getByTestId("container-cabecalho");

        expect(container.props.style).toContainEqual({ backgroundColor: "#c2c2c2" });
    });
});
