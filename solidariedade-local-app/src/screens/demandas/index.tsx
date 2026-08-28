import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Surface, Text } from "react-native-paper";

import { Cabecalho } from "../../ui/components/Cabecalho";
import { FiltroBusca } from "../../ui/components/FiltroBusca";
import { CardDemanda } from "../../ui/components/CardDemanda";

const DemandasScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <Surface style={styles.surface}  elevation={0}>
                {/* Cabeçalho */}
                <Cabecalho />

                {/* Filtros de busca */}
                <FiltroBusca />

                {/* Lista de demandas */}
                <View style={styles.listaDemandas}>
                    <Text variant="titleLarge">Demandas</Text>

                    <CardDemanda />
                </View>
            </Surface>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    surface: {
        flex: 1
    },
    listaDemandas: {
        margin: 10
    },
});

export { DemandasScreen };
