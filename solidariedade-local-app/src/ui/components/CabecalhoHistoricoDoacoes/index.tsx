import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const CabecalhoHistoricoDoacoes = () => {

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={[styles.textoCabecalho, { fontWeight: "bold" }]}>
                Histórico de Doações
            </Text>

            <View style={styles.containerOffline}>
                <MaterialDesignIcons name="cloud-off-outline" size={24} color="#ffffff" />
                <Text variant="bodyLarge" style={styles.textoCabecalho}>
                    Modo offline
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    
    container: {
        backgroundColor: "#22C55E",
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    textoCabecalho: {
        color: "#ffffff"
    },
    containerOffline: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 10
    }
});

export { CabecalhoHistoricoDoacoes };
