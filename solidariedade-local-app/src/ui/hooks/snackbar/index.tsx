import { useContext } from "react";

import { SnackbarContext } from "@/ui/contexts/snackbar";

const useSnackbar = () => {
    const context = useContext(SnackbarContext);

    if(!context)
        throw new Error("'useSnackbar' deve ser utilizado dentro de SnackbarProvider.");

    return context;
};

export { useSnackbar };
