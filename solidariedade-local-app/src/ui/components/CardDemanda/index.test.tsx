import { render } from "@testing-library/react-native";

import { CardDemanda } from ".";
import { buscarDemanda } from "@/data/api/buscar-demandas";

describe("Suite de testes de unidade para validar o componente de UI 'CardDemanda'", () => {
    it("Deve renderizar as informacoes textuais da demanda corretamente", async () => {
        // Arrange
        const demanda = buscarDemanda();

        // Act
        const { getByText } = await render(<CardDemanda demanda={demanda} />);

        // Assert
        expect(getByText(demanda.nomeInstituicao)).toBeTruthy();
        expect(getByText(demanda.necessidadesInstituicao)).toBeTruthy();
        expect(getByText(demanda.itensDoacao)).toBeTruthy();
        expect(getByText(demanda.localizacaoInstituicao)).toBeTruthy();
    });
});
