import { render } from "@testing-library/react-native";

import { CabecalhoHistoricoDoacoes } from ".";

describe("Suite de testes de unidade para validar o componente de UI 'CabecalhoHistoricoDoacoes'", () => {
    it("Deve renderizar o titulo da tela e a informacao de modo offline", async () => {
        const { getByText } = await render(<CabecalhoHistoricoDoacoes />);

        expect(getByText("Histórico de Doações")).toBeTruthy();
        expect(getByText("Modo offline")).toBeTruthy();
    });
});
