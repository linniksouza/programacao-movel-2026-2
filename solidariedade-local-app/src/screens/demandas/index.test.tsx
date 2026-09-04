import { render } from "@testing-library/react-native";

import { buscarDemanda } from "@/data/api/buscar-demandas";
import { DemandasScreen } from ".";

jest.mock("@/data/api/buscar-demandas", () => {
    const original = jest.requireActual("@/data/api/buscar-demandas");

    return {
        ...original,
        buscarDemandas: () => {
            return [
                original.buscarDemanda()
            ];
        }
    };
});

describe("Suite de testes de unidade para validar a tela 'DemandasScreen'", () => {
    it("Deve renderizar os componentes de UI corretamente", async () => {
        const demanda = buscarDemanda();

        const { getByPlaceholderText, getByText } = await render(<DemandasScreen />);

        expect(getByText("Olá, Linnik!")).toBeTruthy();
        expect(getByText("Veja as necessidades de hoje")).toBeTruthy();
        expect(getByPlaceholderText("Buscar demandas...")).toBeTruthy();
        expect(getByText("Filtros")).toBeTruthy();
        expect(getByText("Demandas")).toBeTruthy();
        expect(getByText(demanda.nomeInstituicao)).toBeTruthy();
        expect(getByText(demanda.necessidadesInstituicao)).toBeTruthy();
        expect(getByText(demanda.itensDoacao)).toBeTruthy();
        expect(getByText(demanda.localizacaoInstituicao)).toBeTruthy();
    });
});
