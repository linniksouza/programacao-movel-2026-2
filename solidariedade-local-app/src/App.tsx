import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { DemandasScreen } from './screens/demandas';

export default function App() {
  return (
    <View>
      <DemandasScreen />
      <StatusBar style="auto" />
    </View>
  );
}
