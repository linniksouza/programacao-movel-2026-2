import { DefaultTheme } from "react-native-paper";

const AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#5B2DB8",
        surface: "#F5F5F5"
    },
    shape: {
        border: "3px",
        borderRounded: "35px"
    },
    spacing(size = 1): string {
        return `${(size * 8)}px`
    }
};

export { AppTheme };
