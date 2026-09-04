import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import { Demanda } from "@/data/models/demanda.mode";

type CardDemandaProps = {
    demanda: Demanda;
};

const CardDemanda = ({ demanda }: CardDemandaProps) => {

    return (
        <Card style={styles.cardDemandas} mode="outlined">
            <View style={styles.conteudoCardDemandas}>
                <Card.Cover
                    style={styles.imagemInstituicao}
                    source={{ uri: demanda.imagemInstituicao }}
                />

                <Card.Content style={styles.detalhesCardDemandas}>
                    <Text variant="titleLarge" style={styles.nomeInstituicao}>
                        {demanda.nomeInstituicao}
                    </Text>
                    <Text variant="bodyMedium" style={styles.objetivoDemanda}>
                        {demanda.necessidadesInstituicao}
                    </Text>
                    <Text variant="bodySmall" style={styles.itensDoacao}>
                        {demanda.itensDoacao}
                    </Text>
                    <Text variant="bodySmall" style={styles.localizacaoInstituicao}>
                        {demanda.localizacaoInstituicao}
                    </Text>
                </Card.Content>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    cardDemandas: {
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: "#ffffff"
    },
    conteudoCardDemandas: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 15,
    },
    imagemInstituicao: {
        width: 120,
        height: 100,
        borderRadius: 10
    },
    detalhesCardDemandas: {
        flex: 1,
        padding: 0
    },
    nomeInstituicao: {
        fontWeight: "bold"
    },
    objetivoDemanda: {
        marginVertical: 2
    },
    itensDoacao: {
        opacity: 0.6,
        marginBottom: 2
    },
    localizacaoInstituicao: {
        opacity: 0.6
    }
});

export { CardDemanda };
