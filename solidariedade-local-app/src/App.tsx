import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';

import { MainTabs } from './navigation/Tabs';
import { AppTheme } from './ui/themes';

export default function App() {
  return (
    <PaperProvider theme={AppTheme}>
        <MainTabs />
        <StatusBar style="auto" />
    </PaperProvider>
  );
}
