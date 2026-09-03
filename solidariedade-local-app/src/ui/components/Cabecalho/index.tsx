import { StyleSheet, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";

const Cabecalho = () => {
    const theme = useTheme();

    return (
        <View testID="container-cabecalho" style={[styles.cabecalho, { backgroundColor: theme.colors.primary }]}>
            <View>
                <Text variant="titleLarge" style={styles.saudacaoUsuario}>
                    Olá, Linnik!
                </Text>
                <Text variant="bodyMedium" style={styles.orientacoes}>
                    Veja as necessidades de hoje
                </Text>
            </View>

            <View>
                <IconButton
                    icon="bell-outline"
                    iconColor="#ffffff"
                    size={30}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cabecalho: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
    saudacaoUsuario: {
        color: "#ffffff",
        fontWeight: "bold"
    },
    orientacoes: {
        color: "#ffffff",
        opacity: 0.9
    },
});

export { Cabecalho };
