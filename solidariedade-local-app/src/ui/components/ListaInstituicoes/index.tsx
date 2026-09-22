import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";

import { Instituicao } from "@/data/models/instituicao.model";
import { InstituicoesStackParams } from "@/navigation/Stack";
import { CardInstituicao } from "@/ui/components/CardInstituicao";

type ListaInstituicoesProps = {
    instituicoes: Instituicao[];
};

const ListaInstituicoes = ({ instituicoes }: ListaInstituicoesProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<InstituicoesStackParams>>();
    const renderInstituicao = ({ item }: { item: Instituicao }) => {
        return (
            <>
                <CardInstituicao
                    instituicao={item}
                    onPress={() => {
                        navigation.navigate(
                            "DetalhesInstituicao",
                            {
                                idInstituicao: item.id
                            }
                        );
                    }}
                />
                <Divider />
            </>
        );
    };
    const keyExtractorInstituicao = (item: Instituicao) => item.id;

    return (
        <View style={styles.listaInstituicoes}>
            <FlatList
                testID="list-instituicoes"
                data={instituicoes}
                renderItem={renderInstituicao}
                keyExtractor={keyExtractorInstituicao}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listaInstituicoes: {
        margin: 10
    }
});

export { ListaInstituicoes };
