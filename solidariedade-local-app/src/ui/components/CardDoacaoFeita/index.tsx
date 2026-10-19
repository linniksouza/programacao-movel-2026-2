import { FC } from "react";
import { Avatar, Text } from "react-native-paper";

import { buscarInstituicao } from "@/data/api/instituicoes";
import { Doacao } from "@/data/models/doacao.model";
import {
    CardDoacaoFeita as CardDoacaoFeitaStyled,
    ContainerDadosDoacao,
    ContainerMomentoDoacao
} from "./index.styles";

type CardDoacaoFeitaProps = {
    doacao: Doacao;
};

const CardDoacaoFeita: FC<CardDoacaoFeitaProps> = ({
    doacao
}) => {
    const instituicao = buscarInstituicao(doacao.idInstituicao);
    const itens = doacao.itensDoacao.length;
    const unidades = doacao.itensDoacao.reduce((acc, item) => acc + item.quantidade, 0);
    const itensUnidades = `${itens} itens - ${unidades} unidades`;
    const horaDoacao = doacao.dataHoraDoacao.toFormat("HH:mm");

    return (
        <CardDoacaoFeitaStyled
            testID="card-doacao-feita"
            elevation={2}
        >
            <Avatar.Image source={{ uri: instituicao?.imagemPrincipal }} />

            <ContainerDadosDoacao>
                <Text variant="titleMedium">
                    {instituicao?.nome}
                </Text>
                <Text variant="bodySmall">
                    {doacao.tipoDoacao}
                </Text>
                <Text variant="bodySmall">
                    {itensUnidades}
                </Text>
            </ContainerDadosDoacao>

            <ContainerMomentoDoacao>
                <Text variant="bodySmall">
                    {horaDoacao}
                </Text>
            </ContainerMomentoDoacao>
        </CardDoacaoFeitaStyled>
    );
};

export { CardDoacaoFeita };
