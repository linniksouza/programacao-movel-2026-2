import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";

type FiltroBuscaInstituicaoProps = {
    onFiltrarInstituicoes: (sentenca: string) => void;
};

const FiltroBuscaInstituicao = ({ onFiltrarInstituicoes }: FiltroBuscaInstituicaoProps) => {
    const [busca, setBusca] = useState("");

    const onChangeFiltro = (value: string) => {
        setBusca(value);
        onFiltrarInstituicoes(value);
    };

    return (
        <View style={styles.filtroBuscas}>
            <Searchbar
                testID="input-buscar-instituicoes"
                placeholder="Buscar instituições..."
                value={busca}
                onChangeText={onChangeFiltro}
                onClearIconPress={() => onChangeFiltro("")}
                style={styles.barraBuscar}
                inputStyle={styles.inputBuscar}
            />
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
    barraBuscar: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: "#f5f5f5",
        borderWidth: 1,
        borderColor: "#c2c2c2"
    },
    inputBuscar: {
        minHeight: 0
    }
});

export { FiltroBuscaInstituicao };

