import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const HistoricoDoacoesScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <Text variant="displayMedium">Você ainda não fez nenhuma doação!</Text>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    }
});

export { HistoricoDoacoesScreen };
