import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';

import { DemandasScreen } from './screens/demandas';
import { AppTheme } from './ui/themes';

export default function App() {
  return (
    <PaperProvider theme={AppTheme}>
      <DemandasScreen />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
