import { useNavigation } from "@react-navigation/native";
import {
    NativeStackNavigationProp,
    NativeStackScreenProps
} from "@react-navigation/native-stack";
import { DateTime } from "luxon";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    View
} from "react-native";
import {
    Avatar,
    Button,
    Snackbar,
    Surface,
    Text,
    TextInput
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { buscarDemanda } from "@/data/api/demandas";
import { buscarUsuario } from "@/data/api/usuarios";
import { doacoesRepositoryFactory } from "@/data/drizzle";
import { Doacao, ItemDoacao } from "@/data/models/doacao.model";
import { DemandasStackParams } from "@/navigation/Stack";
import { ListaItensDoacao } from "@/ui/components/ListaItensDoacao";

type RegistroDoacaoScreenProps = NativeStackScreenProps<DemandasStackParams, "RegistrarDoacao">;

const RegistroDoacaoScreen = ({ route }: RegistroDoacaoScreenProps) => {
    const [quantidades, setQuantidades] = useState<Record<string, number>>({});
    const [observacoes, setObservacoes] = useState("");
    const [salvando, setSalvando] = useState(false);
    const [exibirSnackbar, setExibirSnackbar] = useState(false);
    const [mensagemSnackbar, setMensagemSnackbar] = useState("");
    const navigation = useNavigation<NativeStackNavigationProp<DemandasStackParams>>();
    const idDemanda = route.params.idDemanda;
    const demanda = buscarDemanda(idDemanda);
    const doacoesRepository = doacoesRepositoryFactory();

    const usuario = buscarUsuario();

    const handleQuantidadeChange = (key: string, value: number) => {
        setQuantidades((prev) => ({
            ...prev,
            [key]: value
        }));
    };

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
        const itensDoacao = (
            demanda?.itensDoacao
                .map((item): ItemDoacao => {
                    const key = `${item.nome}-${item.unidadeMedida}`;

                    return {
                        nome: item.nome,
                        unidadeMedida: item.unidadeMedida,
                        quantidade: quantidades[key] || 0
                    };
                })
                .filter(item => item.quantidade > 0)
        );

        if(itensDoacao?.length === 0){
            return;
        }

        const payload: Doacao = {
            tipoDoacao: demanda?.necessidadesInstituicao!,
            observacoes: observacoes,
            itensDoacao: [...itensDoacao!],
            idInstituicao: demanda?.instituicao.id!,
            nomeInstituicao: demanda?.instituicao.nome!,
            idDoador: usuario.id,
            nomeDoador: usuario.nome,
            emailDoador: usuario.email,
            dataHoraDoacao: DateTime.now()
        };
        console.log(`Preparando para registrar uma doacao: ${JSON.stringify(payload)}`);

        setSalvando(true);
        setTimeout(async () => {
            try{
                const sucesso = await doacoesRepository.salvarDoacao(payload);
                if(sucesso){
                    setMensagemSnackbar("Doação registrada com sucesso!");
                    navigation.navigate("Demandas");
                }else{
                    setMensagemSnackbar("Falha no registro da doação. Tente novamente.");
                }
            }catch(e: any){
                console.error("Erro ao tentar registrar uma doação:", e);
                setMensagemSnackbar("Falha no registro da doação. Tente novamente.");
            }finally{
                setSalvando(false);
                setExibirSnackbar(true);
            }
        }, 3000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text variant="titleLarge">
                    Instituição
                </Text>

                <Surface style={styles.infosInstituicao} elevation={2}>
                    <Avatar.Image source={{ uri: demanda?.instituicao.imagemPrincipal }} />

                    <View>
                        <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                            {demanda?.instituicao.nome}
                        </Text>
                        <Text variant="bodySmall">
                            {demanda?.instituicao.localizacao}
                        </Text>
                    </View>
                </Surface>
            </View>

            <ListaItensDoacao
                itensDoacao={demanda!.itensDoacao}
                quantidades={quantidades}
                onChangeQuantidade={handleQuantidadeChange}
            />

            <View style={styles.observacoesDoacao}>
                <Text variant="titleLarge">Observações</Text>
                <TextInput
                    style={styles.inputObservacoesDoacao}
                    mode="outlined"
                    value={observacoes}
                    onChangeText={setObservacoes}
                    placeholder="Ex.: Entregue na portaria"
                    multiline
                    numberOfLines={3}
                />
            </View>

            <View style={styles.botoesAcaoDoacao}>
                <Button
                    testID="btn-confirmar-doacao"
                    mode="contained"
                    loading={salvando}
                    disabled={salvando}
                    onPress={confirmarDoacao}
                >
                    Confirmar Doação
                </Button>
                <Button
                    testID="btn-cancelar-doacao"
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
                {mensagemSnackbar}
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
