import { FC } from "react";
import { Button } from "react-native";

import { useSnackbar } from "@/ui/hooks/snackbar";
import { act, fireEvent, render, waitFor } from "@/utils/test-utils";

const ComponenteDeTeste: FC = () => {
    const { hideSnackbar, showSnackbar } = useSnackbar();

    const onExibirMensagem = () => {
        showSnackbar("Operação realizada com sucesso!", 5000);
    };
    const onOcultarMensagem = () => {
        hideSnackbar();
    };

    return (
        <>
            <Button title="Exibir Mensagem" onPress={onExibirMensagem} />
            <Button title="Ocultar Mensagem" onPress={onOcultarMensagem} />
        </>
    );
};

describe("Suite de testes de unidade para validar o contexto de UI 'SnackbarProvider'", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("Deve exibir a mensagem do Snackbar quando 'showSnackbar' for executado", async () => {
        const {
            getByText,
            queryByText
        } = await render(<ComponenteDeTeste />);
        const btnExibirMensagem = getByText("Exibir Mensagem");

        expect(queryByText("Operação realizada com sucesso!")).toBeFalsy();

        await fireEvent.press(btnExibirMensagem);

        expect(queryByText("Operação realizada com sucesso!")).toBeTruthy();
    });

    it("Deve ocultar a mensagem do Snackbar quando o botão 'Fechar' da acao do Snackbar for pressionado", async () => {
        const {
            getByText,
            queryByText
        } = await render(<ComponenteDeTeste />);
        
        const btnExibirMensagem = getByText("Exibir Mensagem");
        await fireEvent.press(btnExibirMensagem);
        expect(queryByText("Operação realizada com sucesso!")).toBeTruthy();

        const btnFechar = getByText("Fechar");
        await fireEvent.press(btnFechar);
        await waitFor(() => {
            expect(queryByText("Operação realizada com sucesso!")).toBeFalsy();
        });
    });

    it("Deve ocultar a mensagem do Snackbar quando 'hideSnackbar' for executado", async () => {
        const {
            getByText,
            queryByText
        } = await render(<ComponenteDeTeste />);
        
        const btnExibirMensagem = getByText("Exibir Mensagem");
        await fireEvent.press(btnExibirMensagem);
        expect(queryByText("Operação realizada com sucesso!")).toBeTruthy();

        const btnOcultarMensagem = getByText("Ocultar Mensagem");
        await fireEvent.press(btnOcultarMensagem);
        await waitFor(() => {
            expect(queryByText("Operação realizada com sucesso!")).toBeFalsy();
        });
    });

    it("Deve ocultar a mensagem do Snackbar automaticamente apos o tempo de espera ser atingido", async () => {
        const {
            getByText,
            queryByText
        } = await render(<ComponenteDeTeste />);
        
        const btnExibirMensagem = getByText("Exibir Mensagem");
        await fireEvent.press(btnExibirMensagem);
        expect(queryByText("Operação realizada com sucesso!")).toBeTruthy();

        await act(() => {
            jest.advanceTimersByTime(5000);
        });

        await waitFor(() => {
            expect(queryByText("Operação realizada com sucesso!")).toBeFalsy();
        });
    });
});
