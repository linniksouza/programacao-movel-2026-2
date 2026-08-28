import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Searchbar } from "react-native-paper";

const FiltroBusca = () => {
    const [busca, setBusca] = useState("");

    return (
        <View style={styles.filtroBuscas}>
            <Searchbar
                value={busca}
                onChangeText={setBusca}
                style={styles.inputBuscarDemandas}
                placeholder="Buscar demandas...."
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
    inputBuscarDemandas: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: "#f5f5f5"
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
