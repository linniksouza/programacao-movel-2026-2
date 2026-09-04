import { render } from "@testing-library/react-native";

import { buscarDemandas } from "@/data/api/buscar-demandas";
import { ListaDemandas } from ".";

describe("Suite de testes de unidade para validar o componente de UI 'ListaDemandas'", () => {
    it("Deve renderizar corretamente 5 cards de demanda quando forem passadas 5 demandas", async () => {
        const demandas = buscarDemandas().slice(0, 5);

        const { getByText } = await render(<ListaDemandas demandas={demandas} />);

        for(const item of demandas){
            expect(getByText(item.necessidadesInstituicao)).toBeOnTheScreen();
        }
    });
});
