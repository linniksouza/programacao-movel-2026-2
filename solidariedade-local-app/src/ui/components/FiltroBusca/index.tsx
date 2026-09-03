import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Searchbar } from "react-native-paper";

const FiltroBusca = () => {
    const [busca, setBusca] = useState("");

    return (
        <View style={styles.filtroBuscas}>
            <Searchbar
                testID="input-buscar-demandas"
                placeholder="Buscar demandas..."
                value={busca}
                onChangeText={setBusca}
                style={styles.barraBuscarDemandas}
                inputStyle={styles.inputBuscaDemandas}
            />
            <Button
                mode="contained"
                icon="filter"
                style={styles.botaoFiltro}
                contentStyle={styles.contentBotaoFiltro}
            >
                Filtros
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    filtroBuscas: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        gap: 8
    },
    barraBuscarDemandas: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: "#f5f5f5"
    },
    inputBuscaDemandas: {
        minHeight: 0
    },
    botaoFiltro: {
        justifyContent: "center",
        borderRadius: 10
    },
    contentBotaoFiltro: {
        paddingVertical: 4
    }
});

export { FiltroBusca };
