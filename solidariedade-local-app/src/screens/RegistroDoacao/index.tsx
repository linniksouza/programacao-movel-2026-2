import { useNavigation } from "@react-navigation/native";
import {
    NativeStackNavigationProp,
    NativeStackScreenProps
} from "@react-navigation/native-stack";
import { DateTime } from "luxon";
import { FC, useState } from "react";
import { Alert } from "react-native";
import { Avatar } from "react-native-paper";

import { registrarDoacao } from "@/data/api/doacoes";
import { buscarUsuario } from "@/data/api/usuarios";
import { doacoesRepositoryFactory } from "@/data/drizzle";
import { Doacao, NovoItemDoacao } from "@/data/models/doacao.model";
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
    const { demanda } = route.params;
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

    const salvarDoacaoApi = async (itens: NovoItemDoacao[]): Promise<Doacao> => {
        return await registrarDoacao({
            cpf_doador: usuario.cpf,
            id_demanda: demanda.id,
            observacoes: observacoes,
            itens: itens
        });
    };
    const salvarDoacaoLocal = async (doacao: Doacao): Promise<boolean> => {
        return await doacoesRepository.salvarDoacao({
            id: doacao.id,
            tipoDoacao: doacao.demanda.necessidades,
            observacoes: observacoes,
            cpfDoador: usuario.cpf,
            nomeDoador: usuario.nome,
            emailDoador: usuario.email,
            idInstituicao: demanda.instituicao.cnpj,
            nomeInstituicao: demanda.instituicao.nome,
            dataHoraDoacao: DateTime.fromISO(
                doacao.data_hora_doacao
            ),
            itensDoacao: doacao.itens.map((item) => ({
                id: item.id,
                nome: item.nome,
                unidadeMedida: item.unidade_medida,
                quantidade: item.quantidade
            }))
        });
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
    const salvarDoacao = async () => {
        const itensDoacao = (
            demanda.itens
                .map((item): NovoItemDoacao => {
                    const key = `${item.nome}-${item.unidade_medida}`;

                    return {
                        nome: item.nome,
                        unidade_medida: item.unidade_medida,
                        quantidade: quantidades[key] || 0
                    };
                })
                .filter(item => item.quantidade > 0)
        );

        console.log(JSON.stringify(itensDoacao));
        if(itensDoacao.length === 0){
            showSnackbar("Você precisa indicar ao menos um item para doação.");
            return;
        }

        try{
            const doacaoFeita = await salvarDoacaoApi(itensDoacao);
            const sucesso = await salvarDoacaoLocal(doacaoFeita);

            if(sucesso){
                showSnackbar("Doação registrada com sucesso!");
            }else{
                showSnackbar("Doação registrada no servidor remoto.");
            }

            limparDoacao();
            navigation.navigate("Demandas");
        }catch(e: any){
            console.log("Erro ao tentar registrar uma doação:", e);
            showSnackbar("Falha no registro da doação. Tente novamente.");
        }finally{
            setSalvando(false);
        }
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
                            source={{ uri: demanda?.instituicao.imagem_principal }}
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
                        itensDoacao={demanda.itens}
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
