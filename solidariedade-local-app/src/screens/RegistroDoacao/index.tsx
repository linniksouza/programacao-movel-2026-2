import { useNavigation } from "@react-navigation/native";
import {
    NativeStackNavigationProp,
    NativeStackScreenProps
} from "@react-navigation/native-stack";
import { DateTime } from "luxon";
import { FC, useState } from "react";
import { Alert } from "react-native";
import { Avatar } from "react-native-paper";

import { buscarDemanda } from "@/data/api/demandas";
import { buscarUsuario } from "@/data/api/usuarios";
import { doacoesRepositoryFactory } from "@/data/drizzle";
import { Doacao, ItemDoacao } from "@/data/models/doacao.model";
import { DemandasStackParams } from "@/navigation/Stack";
import { ScreenContainer } from "@/screens/index.styles";
import { ListaItensDoacao } from "@/ui/components/ListaItensDoacao";
import { useSnackbar } from "@/ui/hooks/snackbar";
import {
    BotaoAcao,
    CardInstituicao,
    ContainerBotoesAcao,
    ContainerDadosInstituicao,
    ContainerRegistrarDoacao,
    ContainerSecao,
    InputObservacoes,
    LocalizacaoInstituicao,
    NomeInstituicao,
    TextoSecao
} from "./index.styles";

type RegistroDoacaoScreenProps = NativeStackScreenProps<DemandasStackParams, "RegistrarDoacao">;

const RegistroDoacaoScreen: FC<RegistroDoacaoScreenProps> = ({
    route
}) => {
    const idDemanda = route.params.idDemanda;
    const demanda = buscarDemanda(idDemanda);
    const usuario = buscarUsuario();
    const doacoesRepository = doacoesRepositoryFactory();
    const navigation = useNavigation<NativeStackNavigationProp<DemandasStackParams>>();
    const { showSnackbar } = useSnackbar();

    const [quantidades, setQuantidades] = useState<Record<string, number>>({});
    const [observacoes, setObservacoes] = useState("");
    const [salvando, setSalvando] = useState(false);

    const handleChangeQuantidade = (key: string, value: number) => {
        setQuantidades((prev) => ({
            ...prev,
            [key]: value
        }));
    };
    const limparDoacao = () => {
        setQuantidades({});
        setObservacoes("");
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
                    showSnackbar("Doação registrada com sucesso!");
                    navigation.navigate("Demandas");
                }else{
                    showSnackbar("Falha no registro da doação. Tente novamente.");
                }
            }catch(e: any){
                console.error("Erro ao tentar registrar uma doação:", e);
                showSnackbar("Falha no registro da doação. Tente novamente.");
            }finally{
                limparDoacao();
                setSalvando(false);
            }
        }, 3000);
    };

    return (
        <ScreenContainer>
            <ContainerRegistrarDoacao>
                <ContainerSecao>
                    <TextoSecao variant="titleMedium">
                        Instituição
                    </TextoSecao>

                    <CardInstituicao elevation={2}>
                        <Avatar.Image
                            source={{ uri: demanda?.instituicao.imagemPrincipal }}
                        />

                        <ContainerDadosInstituicao>
                            <NomeInstituicao variant="titleMedium">
                                {demanda?.instituicao.nome}
                            </NomeInstituicao>
                            <LocalizacaoInstituicao variant="bodyMedium">
                                {demanda?.instituicao.localizacao}
                            </LocalizacaoInstituicao>
                        </ContainerDadosInstituicao>
                    </CardInstituicao>
                </ContainerSecao>

                <ContainerSecao>
                    <TextoSecao variant="titleMedium">
                        Itens para doação
                    </TextoSecao>

                    <ListaItensDoacao
                        itensDoacao={demanda!.itensDoacao}
                        quantidades={quantidades}
                        onChangeQuantidade={handleChangeQuantidade}
                    />
                </ContainerSecao>

                <ContainerSecao>
                    <TextoSecao variant="titleMedium">
                        Observações (opcional)
                    </TextoSecao>

                    <InputObservacoes
                        mode="outlined"
                        value={observacoes}
                        onChangeText={setObservacoes}
                        placeholder="Ex.: Entregue na portaria"
                        multiline
                        numberOfLines={5}
                    />
                </ContainerSecao>

                <ContainerBotoesAcao>
                    <BotaoAcao
                        testID="btn-confirmar-doacao"
                        mode="contained"
                        loading={salvando}
                        disabled={salvando}
                        onPress={confirmarDoacao}
                    >
                        Confirmar Doação
                    </BotaoAcao>
                    <BotaoAcao
                        testID="btn-cancelar-doacao"
                        mode="text"
                        disabled={salvando}
                    >
                        Cancelar Doação
                    </BotaoAcao>
                </ContainerBotoesAcao>
            </ContainerRegistrarDoacao>
        </ScreenContainer>
    );
};

export { RegistroDoacaoScreen };

