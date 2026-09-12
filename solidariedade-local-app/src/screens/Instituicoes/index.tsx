import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { FlatList, StyleSheet, View } from "react-native";
import { Avatar, Divider, IconButton, Surface, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { buscarDemandas } from "@/data/api/buscar-demandas";
import { Demanda } from "@/data/models/demanda.mode";

const InstituicoesScreen = () => {
    const demandas = buscarDemandas();

    const renderInstituicao = ({ item }: { item: Demanda }) => {

        return (
            <>
                <View
                    testID="card-instituicao"
                    style={styles.cardInstituicao}
                >
                    <Avatar.Image
                        source={{ uri: item.imagemInstituicao }}
                    />

                    <View style={{ width: "60%" }}>
                        <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                            {item.nomeInstituicao}
                        </Text>
                        <View style={styles.localizacaoInstituicao}>
                            <MaterialDesignIcons name="google-maps" size={10} color="#c3c3c3" />
                            <Text variant="bodySmall">
                                {item.localizacaoInstituicao}
                            </Text>
                        </View>
                    </View>

                    <IconButton icon="heart" style={{ marginStart: "auto" }} />
                </View>
                <Divider />
            </>
        );
    };
    const keyExtractorInstituicao = (item: Demanda) => item.id;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cabecalho}>
                <Text style={{ color: "#ffffff", fontWeight: "bold" }} variant="titleLarge">Instituições</Text>
            </View>

            <Surface style={styles.instituicoes} elevation={2}>
                <FlatList
                    data={demandas}
                    renderItem={renderInstituicao}
                    keyExtractor={keyExtractorInstituicao}
                />
            </Surface>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
        backgroundColor: "#5B2DB8"
    },
    cabecalho: {
        padding: 20,
        backgroundColor: "#5B2DB8"
    },
    instituicoes: {
        padding: 20,
        borderRadius: 30,
    },
    cardInstituicao: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        marginVertical: 10
    },
    localizacaoInstituicao: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    }
});

export { InstituicoesScreen };
