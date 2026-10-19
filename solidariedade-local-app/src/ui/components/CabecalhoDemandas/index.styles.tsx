import { IconButton, Text } from "react-native-paper";
import styled from "styled-components/native";

const CabecalhoDemandas = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => `${theme.spacing(6.25)} ${theme.spacing(1.25)} ${theme.spacing(2.5)}`};
    background-color: ${({ theme }) => theme.colors.primary};
`;

const ContainerCabecalho = styled.View`
    margin: ${({ theme }) => theme.spacing(0.25)};
`;

const SaudacaoUsuario = styled(Text)`
    color: ${({ theme }) => theme.colors.onPrimary};
    font-weight: bold;
`;

const ChamadoDoacao = styled(Text)`
    color: ${({ theme }) => theme.colors.onPrimary};
`;

export {
    CabecalhoDemandas,
    ChamadoDoacao,
    ContainerCabecalho,
    SaudacaoUsuario
};
