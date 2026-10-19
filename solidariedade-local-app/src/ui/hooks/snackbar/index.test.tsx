import { renderHook } from "@testing-library/react-native";
import { ReactNode } from "react";
import { PaperProvider } from "react-native-paper";

import { SnackbarProvider } from "@/ui/contexts/snackbar";
import { useSnackbar } from ".";

describe("Suite de testes de unidade para validar o hook 'useSnackbar'", () => {
    it("Deve lancar um erro se o hook for utilizado fora do 'SnackbarProvider'", async () => {
        expect(async () => await renderHook(useSnackbar))
            .rejects
            .toThrow("'useSnackbar' deve ser utilizado dentro de SnackbarProvider.");
    });

    it("Deve retornar as funcoes do contexto quando o hook for utilizado dentro do SnackbarProvider", async () => {
        const wrapper = ({ children }: { children: ReactNode }) => {
            return (
                <PaperProvider>
                    <SnackbarProvider>
                        {children}
                    </SnackbarProvider>
                </PaperProvider>
            );
        };

        const {
            result
        } = await renderHook(
            useSnackbar,
            { wrapper }
        );

        expect(result.current.hideSnackbar).toBeDefined();
        expect(result.current.showSnackbar).toBeDefined();
        expect(typeof result.current.hideSnackbar).toBe("function");
        expect(typeof result.current.showSnackbar).toBe("function");
    });
});
