import { Surface, Text } from "react-native-paper";
import styled from "styled-components/native";

const CabecalhoInstituicoes = styled.View`
    padding: ${({ theme }) => `${theme.spacing(7)} ${theme.spacing(2.5)} ${theme.spacing(5)}`};
    background-color: ${({ theme }) => theme.colors.primary};
`;

const TituloCabecalhoInstituicoes = styled(Text)`
    font-weight: bold;
    color: ${({ theme }) => theme.colors.onPrimary};
`;

const ContainerInstituicoes = styled(Surface)`
    margin-top: ${({ theme }) => theme.spacing(-3.25)};
    padding: ${({ theme }) => theme.spacing(2.5)};
    height: 100%;
    background-color: ${({ theme }) => theme.colors.surface};
    border-top-left-radius: ${({ theme }) => theme.spacing(3.75)};
    border-top-right-radius: ${({ theme }) => theme.spacing(3.75)};
`;

export {
    CabecalhoInstituicoes,
    ContainerInstituicoes,
    TituloCabecalhoInstituicoes
};
