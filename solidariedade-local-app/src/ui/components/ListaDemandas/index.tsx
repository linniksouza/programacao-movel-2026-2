import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { Demanda } from "@/data/models/demanda.model";
import { DemandasStackParams } from "@/navigation/Stack";
import { CardDemanda } from "@/ui/components/CardDemanda";

type ListaDemandasProps = {
    demandas: Demanda[];
};

const ListaDemandas = ({ demandas }: ListaDemandasProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<DemandasStackParams>>();
    const renderDemanda = ({ item }: { item: Demanda }) => {
        return (
            <CardDemanda
                demanda={item}
                onPress={() => {
                    navigation.navigate(
                        "RegistrarDoacao",
                        {
                            idDemanda: item.id
                        }
                    );
                }}
            />
        );
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
        margin: 10
    },
    tituloSecaoListaDemandas: {
        fontSize: 20,
        fontWeight: "bold"
    }
});

export { ListaDemandas };
