import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { Demanda } from "@/data/models/demanda.mode";
import { CardDemanda } from "../CardDemanda";

type ListaDemandasProps = {
    demandas: Demanda[];
};

type RenderDemandaParams = {
    item: Demanda;
};

const ListaDemandas = ({ demandas }: ListaDemandasProps) => {
    const renderDemanda = ({ item }: RenderDemandaParams) => {
        return <CardDemanda demanda={item} />;
    };
    const keyExtractorDemanda = (item: Demanda) => {
        return item.id;
    };

    return (
        <View style={styles.listaDemandas}>
            <Text variant="titleLarge" style={styles.tituloSecaoListaDemandas}>
                Demandas
            </Text>

            <FlatList
                testID="list-demandas"
                data={demandas}
                renderItem={renderDemanda}
                keyExtractor={keyExtractorDemanda}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    listaDemandas: {
        flex: 1,
        margin: 10
    },
    tituloSecaoListaDemandas: {
        fontSize: 20,
        fontWeight: "bold"
    }
});

export { ListaDemandas };
