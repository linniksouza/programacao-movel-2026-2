import { DefaultTheme, MD3LightTheme } from "react-native-paper";

const AppTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: "#5B2DB8",
        onPrimary: "#FFFFFF",
        secondary: "#6750A4",
        onSecondary: "#FFFFFF",
        background: "#F5F5F5",
        onBackground: "#1C1B1F",
        surface: "#FFFFFF",
        onSurface: "#1C1B1F",
        surfaceVariant: "#EAE6F0",
        onSurfaceVariant: "#49454F",
        outline: "#79747E",
        success: "#22C55E",
        onSuccess: "#FFFFFF",
        error: "#B3261E",
        onError: "#FFFFFF",
        elevation: {
            ...MD3LightTheme.colors.elevation,
            level0: "transparent",
            level1: "#F7F2FA",
            level2: "#F3EDF7",
            level3: "#EEE8F2",
            level4: "#ECE6F0",
            level5: "#E9E2EC"
        }
    },
    roundness: 12,
    shape: {
        borderRadius: "3px",
        borderRounded: "35px"
    },
    appShape: {
        card: 12,
        input: 10,
        button: 10,
        section: 24,
        pill: 999
    },
    spacing(size = 1): string {
        return `${(size * 8)}px`;
    }
};

type AppThemeType = typeof AppTheme;

export { AppTheme, AppThemeType };
