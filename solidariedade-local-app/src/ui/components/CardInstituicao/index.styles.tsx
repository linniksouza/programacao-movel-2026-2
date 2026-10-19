import {
    MaterialDesignIcons
} from "@react-native-vector-icons/material-design-icons";
import { Text } from "react-native-paper";
import styled from "styled-components/native";

const CardInstituicao = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(2.5)};
    margin: ${({ theme }) => theme.spacing(1.25)} 0;
`;

const ContainerDadosInstituicao = styled.View`
    width: 60%;
`;

const NomeInstituicao = styled(Text)`
    font-weight: bold;
`;

const LocalizacaoInstituicao = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(0.625)};
`;

const IconeLocalizacao = styled(MaterialDesignIcons)`
    color: ${({ theme }) => theme.colors.outline};
`;

const TextoOpaco = styled(Text)`
    opacity: 0.6;
`;

export {
    CardInstituicao,
    ContainerDadosInstituicao,
    IconeLocalizacao,
    LocalizacaoInstituicao,
    NomeInstituicao,
    TextoOpaco
};
