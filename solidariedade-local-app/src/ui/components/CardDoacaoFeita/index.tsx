import { StyleSheet } from "react-native";
import { FC } from "react";
import { View } from "react-native";
import { Avatar, Surface, Text } from "react-native-paper";

import { buscarInstituicao } from "@/data/api/instituicoes";
import { Doacao } from "@/data/models/doacao.model";

type CardDoacaoFeitaProps = {
    doacao: Doacao;
};

const CardDoacaoFeita = ({
    doacao
}: CardDoacaoFeitaProps) => {
    const instituicao = buscarInstituicao(doacao.idInstituicao);
    const itens = doacao.itensDoacao.length;
    const unidades = doacao.itensDoacao.reduce((acc, item) => acc + item.quantidade, 0);
    const horaDoacao = doacao.dataHoraDoacao.toFormat("HH:mm");

    return (
        <Surface
            testID="card-doacao-feita"
            elevation={2}
            style={styles.container}
        >
            <Avatar.Image
                source={{ uri: instituicao?.imagemPrincipal }}
            />
            <View style={{ marginLeft: 10 }}>
                <Text variant="titleMedium">
                    {instituicao?.nome}
                </Text>
                <Text variant="bodySmall">
                    {doacao.tipoDoacao}
                </Text>
                <Text variant="bodySmall">
                    {`${itens} itens - ${unidades} unidades`}
                </Text>
            </View>
            <View style={{ marginLeft: "auto" }}>
                <Text variant="bodySmall">
                    {horaDoacao}
                </Text>
            </View>
        </Surface>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        padding: 20,
        margin: 10,
        borderRadius: 15
    }
});

export { CardDoacaoFeita };