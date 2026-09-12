import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, View } from "react-native";
import { Avatar, Button, Divider, Surface, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { buscarDemanda } from "@/data/api/buscar-demandas";
import { StackParams } from "@/navigation/Stack";
import { ItemDoacao } from "@/ui/components/ItemDoacao";

type RegistroDoacaoScreenProps = NativeStackScreenProps<StackParams, "RegistrarDoacao">;

const RegistroDoacaoScreen = ({ route }: RegistroDoacaoScreenProps) => {
    const idDemanda = route.params.idDemanda;
    const demanda = buscarDemanda(idDemanda);
    const itensDoacao = demanda?.itensDoacao.split(", ");

    const renderItemDoacao = ({ item }: { item: string }) => {
        return (
            <>
                <ItemDoacao item={item} />
                <Divider />
            </>
        );
    };
    const keyExtractorItemDoacao = (item: string) => item;

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text variant="titleLarge">
                    Instituição
                </Text>

                <Surface style={styles.infosInstituicao} elevation={2}>
                    <Avatar.Image
                        source={{ uri: demanda?.imagemInstituicao }}
                        style={{

                        }}
                    />

                    <View>
                        <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>{demanda?.nomeInstituicao}</Text>
                        <Text variant="bodySmall">{demanda?.localizacaoInstituicao}</Text>
                    </View>
                </Surface>
            </View>

            <View style={{ marginTop: 20 }}>
                <Text variant="titleLarge">
                    Itens doados
                </Text>

                <Surface style={styles.itensDoacao} elevation={2}>
                    <FlatList
                        data={itensDoacao}
                        renderItem={renderItemDoacao}
                        keyExtractor={keyExtractorItemDoacao}
                    />
                </Surface>
            </View>

            <View style={styles.observacoesDoacao}>
                <Text variant="titleLarge">Observações</Text>
                <TextInput
                    style={styles.inputObservacoesDoacao}
                    mode="outlined"
                    placeholder="Ex.: Entregue na portaria"
                    multiline
                    numberOfLines={3}
                />
            </View>

            <View style={styles.botoesAcaoDoacao}>
                <Button mode="contained">Confirmar Doação</Button>
                <Button mode="text">Cancelar Doação</Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    infosInstituicao: {
        marginTop: 10,
        paddingVertical: 10,
        paddingStart: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        borderRadius: 15
    },
    itensDoacao: {
        marginTop: 10,
        borderRadius: 15
    },
    observacoesDoacao: {
        marginTop: 20
    },
    inputObservacoesDoacao: {
        marginTop: 10
    },
    botoesAcaoDoacao: {
        marginTop: 20,
        gap: 10
    }
});

export { RegistroDoacaoScreen };

