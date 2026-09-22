import { fireEvent, render } from "@testing-library/react-native";

import { CardInstituicao } from ".";

describe("Suite de testes de unidade para validar o componente de UI 'CardInstituicao'", () => {
    const instituicao = {
        id: "1",
        nome: "Aldeias Infantis S.O.S.",
        biografia: "A Aldeias Infantis SOS é a maior organização do mundo dedicada a apoiar crianças e adolescentes sem cuidados parentais ou em risco de perdê-los.",
        areasAtuacao: ["Crianças", "Assistência Social"],
        enderecoSite: "https://www.aldeiasinfantis.org.br",
        localizacao: "Alvorada",
        imagemPrincipal: "https://www.aldeiasinfantis.org.br/getmedia/5cda5c60-6f7a-4e10-9ddf-4554ebf2b27e/Logo-Aldeias_branco-c.jpg?width=183&height=69&ext=.jpg",
        imagemCapa: "https://www.aldeiasinfantis.org.br/getmedia/f9f970c6-920a-41c7-9fbb-ab49d098c4f4/clickimage_aldeias.png?width=685&height=317"
    };
    const onPress = jest.fn();

    it("Deve renderizar as informações textuais da instituicao corretamente", async () => {
        const { getByText } = await render(
            <CardInstituicao instituicao={instituicao} onPress={onPress} />
        );

        expect(getByText(instituicao.nome)).toBeTruthy();
        expect(getByText(instituicao.localizacao)).toBeTruthy();
    });

    it("Deve detectar o evento de botao do card pressionado", async () => {
        const { getByTestId } = await render(
            <CardInstituicao instituicao={instituicao} onPress={onPress} />
        );

        fireEvent.press(
            getByTestId("btn-detalhes-instituicao")
        );

        expect(onPress).toHaveBeenCalledTimes(1);
    });
});
