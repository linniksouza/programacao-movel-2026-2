import { fireEvent, render } from "@testing-library/react-native";

import { ItemNavegacaoPerfil } from ".";

const onNavigate = jest.fn();

describe("Suite de testes de unidade para validar o componente de UI 'ItemNavegacaoPerfil'", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Deve exibir o titulo do item de navegacao e nao deve executar a acao de navegacao ao tocar no item sem funcao de navegacao", async () => {
        const {
            getByText
        } = await render(
            <ItemNavegacaoPerfil
                icone="account-outline"
                titulo="Dados do Perfil"
            />
        );

        expect(getByText("Dados do Perfil")).toBeTruthy();
        expect(onNavigate).toHaveBeenCalledTimes(0);
    });

    it("Deve exibir o titulo do item de navegacao e deve executar a acao de navegacao ao tocar no item com funcao de navegacao", async () => {
        const {
            getByTestId,
            getByText
        } = await render(
            <ItemNavegacaoPerfil
                icone="account-outline"
                titulo="Dados do Perfil"
                onNavigate={onNavigate}
            />
        );
        const btnNavegarItem = getByTestId("btn-navegar-item");

        await fireEvent.press(btnNavegarItem);

        expect(getByText("Dados do Perfil")).toBeTruthy();
        expect(onNavigate).toHaveBeenCalledTimes(1);
    });
});
