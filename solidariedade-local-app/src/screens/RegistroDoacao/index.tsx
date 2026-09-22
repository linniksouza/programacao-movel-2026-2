import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Avatar, Button, Divider, Snackbar, Surface, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { buscarDemanda } from "@/data/api/demandas";
import { DemandasStackParams } from "@/navigation/Stack";
import { ItemDoacao } from "@/ui/components/ItemDoacao";

type RegistroDoacaoScreenProps = NativeStackScreenProps<DemandasStackParams, "RegistrarDoacao">;

const RegistroDoacaoScreen = ({ route }: RegistroDoacaoScreenProps) => {
    console.log("Iniciando renderizacao...");

    const [salvando, setSalvando] = useState(false);
    const [exibirSnackbar, setExibirSnackbar] = useState(false);
    const idDemanda = route.params.idDemanda;
    const demanda = buscarDemanda(idDemanda);
    const itensDoacao = demanda?.itensDoacao.split(", ");

    const confirmarDoacao = () => {
        Alert.alert(
            "Confirmar Doação",
            "Deseja confirmar esta doação?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Confirmar",
                    onPress: salvarDoacao
                },
            ]
        );
    };
    const salvarDoacao = () => {
        setSalvando(true);
        setTimeout(() => {
            setSalvando(false);
            setExibirSnackbar(true);
        }, 3000);
    };

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
                    <Avatar.Image source={{ uri: demanda?.imagemInstituicao }} />

                    <View>
                        <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                            {demanda?.nomeInstituicao}
                        </Text>
                        <Text variant="bodySmall">
                            {demanda?.localizacaoInstituicao}
                        </Text>
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
                <Button
                    mode="contained"
                    loading={salvando}
                    disabled={salvando}
                    onPress={confirmarDoacao}
                >
                    Confirmar Doação
                </Button>
                <Button
                    mode="text"
                    disabled={salvando}
                >
                    Cancelar Doação
                </Button>
            </View>

            <Snackbar
                style={{ alignSelf: "center" }}
                visible={exibirSnackbar}
                onDismiss={() => setExibirSnackbar(false)}
                duration={3000}
            >
                Doação registrada com sucesso!
            </Snackbar>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
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
