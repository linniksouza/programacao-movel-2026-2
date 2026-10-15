import { fireEvent, render } from "@testing-library/react-native";

import { ItemAtivacaoPerfil } from ".";

const setAtivado = jest.fn();

describe("Suite de testes de unidade para validar o componente de UI 'ItemAtivacaoPerfil'", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Deve deixar desativado quando receber um estado ativado e pressionar uma vez na acao de mudanca", async () => {
        const {
            getByTestId,
            getByText
        } = await render(
            <ItemAtivacaoPerfil
                titulo="Modo Escuro"
                icone="theme-light-dark"
                ativado={true}
                setAtivado={setAtivado}
            />
        );

        fireEvent(
            getByTestId("switch-ativar-desativar"),
            "valueChange",
            false
        );

        expect(getByText("Modo Escuro")).toBeTruthy();
        expect(setAtivado).toHaveBeenCalledTimes(1);
        expect(setAtivado).toHaveBeenCalledWith(false);
    });
});
