import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider } from 'styled-components/native';

import { inicializarDbSQLite } from './data/drizzle/conexao';
import { MainTabs } from './navigation/Tabs';
import { SnackbarProvider } from './ui/contexts/snackbar';
import { AppTheme } from './ui/themes';

export default function App() {
    useEffect(() => {
        (async () => {
            await inicializarDbSQLite();
        })();
    }, []);

    return (
        <PaperProvider theme={AppTheme}>
            <ThemeProvider theme={AppTheme}>
                <SnackbarProvider>
                    <MainTabs />
                    <StatusBar style="auto" />
                </SnackbarProvider>
            </ThemeProvider>
        </PaperProvider>
    );
}
