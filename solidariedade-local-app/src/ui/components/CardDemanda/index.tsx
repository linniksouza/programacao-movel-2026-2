import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

const CardDemanda = () => {

    return (
        <Card style={styles.cardDemandas} mode="outlined">
            <Card.Content style={styles.conteudoCardDemandas}>
                <Card.Cover
                    style={styles.imagemInstituicao}
                    source={require("../../../../assets/lar-esperanca.jpg")}
                />

                <View>
                    <Text variant="titleLarge" style={styles.nomeInstituicao}>
                        Lar Esperança
                    </Text>
                    <Text variant="bodyMedium" style={styles.objetivoDemanda}>
                        Alimentos não perecíveis
                    </Text>
                    <Text variant="bodySmall" style={styles.itensDoacao}>
                        Arroz, feijão, óleo e açúcar
                    </Text>
                    <Text variant="bodySmall" style={styles.localizacaoInstituicao}>
                        Compensa
                    </Text>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    cardDemandas: {
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: "#ffffff"
    },
    conteudoCardDemandas: {
        flexDirection: "row",
        gap: 20,
    },
    imagemInstituicao: {
        width: 120,
        height: 100
    },
    nomeInstituicao: {
        // fontSize: 20,
        fontWeight: "bold"
    },
    objetivoDemanda: {
        fontSize: 18,
        fontWeight: "500",
        marginTop: 8
    },
    itensDoacao: {
        fontSize: 15,
        marginBottom: 5
    },
    localizacaoInstituicao: {
        fontSize: 13,
        marginBottom: 5
    }
});

export { CardDemanda };
