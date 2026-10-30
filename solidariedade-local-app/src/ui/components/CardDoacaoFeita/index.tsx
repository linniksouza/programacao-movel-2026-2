import { FC } from "react";
import { Avatar, Text } from "react-native-paper";

import { DoacaoLocal } from "@/data/models/doacao.model";
import {
    CardDoacaoFeita as CardDoacaoFeitaStyled,
    ContainerDadosDoacao,
    ContainerMomentoDoacao
} from "./index.styles";

type CardDoacaoFeitaProps = {
    doacao: DoacaoLocal;
};

const CardDoacaoFeita: FC<CardDoacaoFeitaProps> = ({
    doacao
}) => {
    const itens = doacao.itensDoacao.length;
    const unidades = doacao.itensDoacao.reduce((acc, item) => acc + item.quantidade, 0);
    const itensUnidades = `${itens} itens - ${unidades} unidades`;
    const horaDoacao = doacao.dataHoraDoacao.toFormat("HH:mm");

    return (
        <CardDoacaoFeitaStyled
            testID="card-doacao-feita"
            elevation={2}
        >
            {("imagem_principal" in doacao)
                ? <Avatar.Image source={{ uri: doacao.imagem_principal as string }} />
                : <Avatar.Text size={50} label={doacao.nomeInstituicao.charAt(0)} />
            }

            <ContainerDadosDoacao>
                <Text variant="titleMedium">
                    {doacao.nomeInstituicao}
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

