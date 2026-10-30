import { DateTime } from "luxon";

import { Demanda } from "@/data/models/demanda.model";
import { fireEvent, render } from "@/utils/test-utils";
import { CardDemanda } from ".";

const dataPostagem = DateTime.now().minus({ days: 3 });
const demanda: Demanda = {
    id: "1",
    necessidades: "Alimentos não perecíveis",
    data_postagem: dataPostagem.toISO(),
    instituicao: {
        cnpj: "1",
        nome: "Lar Esperança",
        localizacao: "Compensa",
        imagem_principal: "https://plus.unsplash.com/premium_vector-1724665300883-3af06a418d3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
    },
        itens: [
            {
            id: "1",
            nome: "Arroz",
            unidade_medida: "Kg"
        },
        {
            id: "2",
            nome: "Feijão",
            unidade_medida: "Kg"
        },
        {
            id: "3",
            nome: "Óleo",
            unidade_medida: "Garrafa"
        },
        {
            id: "4",
            nome: "Açúcar",
            unidade_medida: "Kg"
        }
    ]
};
const onPress = jest.fn();

describe("Suite de testes de unidade para validar o componente de UI 'CardDemanda'", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Deve renderizar as informacoes textuais da demanda corretamente", async () => {
        const {
            getByText
        } = await render(
            <CardDemanda demanda={demanda} onPress={onPress} />
        );

        expect(getByText(demanda.instituicao.nome)).toBeTruthy();
        expect(getByText(demanda.necessidades)).toBeTruthy();
        expect(getByText(demanda.itens[0].nome)).toBeTruthy();
        expect(getByText(demanda.instituicao.localizacao)).toBeTruthy();
    });

    it("Deve detectar o evento de area do card pressionado", async () => {
        const {
            getByTestId
        } = await render(
            <CardDemanda demanda={demanda} onPress={onPress} />
        );

        await fireEvent.press(
            getByTestId("container-card-demanda")
        );

        expect(onPress).toHaveBeenCalledTimes(1);
    });
});
