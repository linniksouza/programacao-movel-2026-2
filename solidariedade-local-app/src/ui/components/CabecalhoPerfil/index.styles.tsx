import { IconButton, Text } from "react-native-paper";
import styled from "styled-components/native";

const CabecalhoPerfil = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(2.5)};
    padding: ${({ theme }) => `${theme.spacing(3.75)} ${theme.spacing(2.5)} ${theme.spacing(2.5)}`};
    background-color: ${({ theme }) => theme.colors.primary};
`;

const NomeUsuario = styled(Text)`
    color: ${({ theme }) => theme.colors.onPrimary};
    font-weight: bold;
`;

const EmailUsuario = styled(Text)`
    color: ${({ theme }) => theme.colors.onPrimary};
`;

const BotaoEditarDados = styled(IconButton)`
    margin-left: auto;
`;

export {
    BotaoEditarDados,
    CabecalhoPerfil,
    EmailUsuario,
    NomeUsuario
};
