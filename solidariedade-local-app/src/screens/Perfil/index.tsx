import { Cabecalho } from "@/ui/components/Cabecalho";
import { StyleSheet, View } from "react-native";
import { Surface, Switch, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const PerfilScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <Cabecalho />

            <View>
                <Surface elevation={2}>
                    <Text>Dados Pessoais</Text>
                </Surface>

                <Surface elevation={2}>
                    <Text>Preferências</Text>
                    <Text>Modo Escuro</Text>
                    <Switch />
                    <Text>Notificações</Text>
                </Surface>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20
    }
});

export { PerfilScreen };
