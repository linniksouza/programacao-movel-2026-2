import { createContext, FC, ReactNode, useCallback, useMemo, useState } from "react";
import { Portal, Snackbar } from "react-native-paper";

type SnackbarContextData = {
    showSnackbar: (message: string, duration?: number) => void;
    hideSnackbar: () => void;
};
const SnackbarContext = createContext<SnackbarContextData | undefined>(undefined);

type SnackbarProviderProps = {
    children: ReactNode;
};
const SnackbarProvider: FC<SnackbarProviderProps> = ({
    children
}) => {
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarDuration, setSnackbarDuration] = useState(3000);

    const showSnackbar = useCallback(
        (message: string, duration: number = 3000) => {
            setSnackbarMessage(message);
            setSnackbarDuration(duration);
            setSnackbarVisible(true);
        },
        []
    );
    const hideSnackbar = useCallback(
        () => setSnackbarVisible(false),
        []
    );

    const contextValue = useMemo(
        () => ({ showSnackbar, hideSnackbar }),
        [showSnackbar, hideSnackbar]
    );

    return (
        <SnackbarContext.Provider value={contextValue}>
            {children}

            <Portal>
                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={hideSnackbar}
                    duration={snackbarDuration}
                    action={{
                        label: "Fechar",
                        onPress: hideSnackbar
                    }}
                    wrapperStyle={{
                        alignSelf: "center"
                    }}
                >
                    {snackbarMessage}
                </Snackbar>
            </Portal>
        </SnackbarContext.Provider>
    );
};

export {
    SnackbarContext,
    SnackbarProvider
};
