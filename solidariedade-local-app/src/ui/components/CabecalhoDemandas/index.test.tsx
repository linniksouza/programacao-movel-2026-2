import { render } from "@/utils/test-utils";
import { CabecalhoDemandas } from ".";

describe("Suite de testes de unidade para validar o componente de UI 'Cabecalho'", () => {
    it("Deve renderizar os textos de saudacao e orientacao corretamente", async () => {
        const {
            getByText
        } = await render(<CabecalhoDemandas />);

        expect(getByText("Olá, Linnik!")).toBeTruthy();
        expect(getByText("Veja as necessidades de hoje")).toBeTruthy();
    });
});
