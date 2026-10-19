import { render, RenderOptions } from "@testing-library/react-native";
import { FC, ReactElement, ReactNode } from "react";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider } from "styled-components/native";

import { SnackbarProvider } from "@/ui/contexts/snackbar";
import { AppTheme } from "@/ui/themes";

type AllTheProvidersProps = {
    children: ReactNode;
};

const AllTheProviders: FC<AllTheProvidersProps> = ({
    children
}) => {

    return (
        <PaperProvider>
            <ThemeProvider theme={AppTheme}>
                <SnackbarProvider>
                    {children}
                </SnackbarProvider>
            </ThemeProvider>
        </PaperProvider>
    );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => {
    return render(
        ui,
        {
            wrapper: AllTheProviders,
            ...options
        }
    );
};

export * from "@testing-library/react-native";
export { customRender as render };
