import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';

import { inicializarDbSQLite } from './data/drizzle/conexao';
import { MainTabs } from './navigation/Tabs';
import { AppTheme } from './ui/themes';

export default function App() {
    useEffect(() => {
        (async () => {
            await inicializarDbSQLite();
        })();
    }, []);

    return (
        <PaperProvider theme={AppTheme}>
            <MainTabs />
            <StatusBar style="auto" />
        </PaperProvider>
    );
}
