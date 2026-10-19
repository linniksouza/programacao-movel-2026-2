import {
    MaterialDesignIcons
} from "@react-native-vector-icons/material-design-icons";
import { Card, Text } from "react-native-paper";
import styled from "styled-components/native";

const CardDemanda = styled(Card)`
    margin: ${({ theme }) => `${theme.spacing(1.25)} 0`};
    border-radius: ${({ theme }) => theme.spacing(1.25)};
    background-color: ${({ theme }) => theme.colors.surface};
`;

const ContainerCardDemanda = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(1.875)};
    padding: ${({ theme }) => theme.spacing(1.25)};
`;

const ImagemInstituicao = styled(Card.Cover)`
    width: ${({ theme }) => theme.spacing(15)};
    height: ${({ theme }) => theme.spacing(12.5)};
    border-radius: ${({ theme }) => theme.spacing(1.25)};
`;

const ConteudoCardDemanda = styled(Card.Content)`
    flex: 1;
    padding: 0;
`;

const NomeInstituicao = styled(Text)`
    font-weight: bold;
`;

const NecessidadeDoacao = styled(Text)`
    margin: ${({ theme }) => `${theme.spacing(0.25)} 0`};
`;

const TextoOpaco = styled(Text)`
    opacity: 0.6;
`;

const LocalizacaoInstituicao = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(0.625)};
    margin-top: ${({ theme }) => theme.spacing(0.25)};
`;

const IconeLocalizacaoInstituicao = styled(MaterialDesignIcons)`
    opacity: 0.6;
`;

export {
    CardDemanda,
    ContainerCardDemanda,
    ConteudoCardDemanda,
    IconeLocalizacaoInstituicao,
    ImagemInstituicao,
    LocalizacaoInstituicao,
    NecessidadeDoacao,
    NomeInstituicao,
    TextoOpaco
};
