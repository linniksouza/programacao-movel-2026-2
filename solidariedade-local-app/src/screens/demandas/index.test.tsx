import { render } from "@testing-library/react-native";

import { DemandasScreen } from ".";

describe("Suite de testes de unidade para validar a tela 'DemandasScreen'", () => {
    it("Deve renderizar os componentes de UI corretamente", async () => {
        const { getByPlaceholderText, getByText } = await render(<DemandasScreen />);

        expect(getByText("Olá, Linnik!")).toBeTruthy();
        expect(getByText("Veja as necessidades de hoje")).toBeTruthy();
        expect(getByPlaceholderText("Buscar demandas...")).toBeTruthy();
        expect(getByText("Filtros")).toBeTruthy();
        expect(getByText("Demandas")).toBeTruthy();
        expect(getByText("Lar Esperança")).toBeTruthy();
        expect(getByText("Alimentos não perecíveis")).toBeTruthy();
        expect(getByText("Arroz, feijão, óleo e açúcar")).toBeTruthy();
        expect(getByText("Compensa")).toBeTruthy();
    });
});
