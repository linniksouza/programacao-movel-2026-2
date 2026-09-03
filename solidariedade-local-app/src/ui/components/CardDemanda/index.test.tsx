import { render } from "@testing-library/react-native";

import { CardDemanda } from ".";

describe("Suite de testes de unidade para validar o componente de UI 'CardDemanda'", () => {
    it("Deve renderizar as informacoes textuais da demanda corretamente", async () => {
        const { getByText } = await render(<CardDemanda />);

        expect(getByText("Lar Esperança")).toBeTruthy();
        expect(getByText("Alimentos não perecíveis")).toBeTruthy();
        expect(getByText("Arroz, feijão, óleo e açúcar")).toBeTruthy();
        expect(getByText("Compensa")).toBeTruthy();
    });
});
