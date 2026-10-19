import { Button, Surface, Text, TextInput } from "react-native-paper";
import styled from "styled-components/native";

const ContainerRegistrarDoacao = styled.View`
    flex: 1;
    padding: ${({ theme }) => `0 ${theme.spacing(2.5)}`};
`;

const ContainerSecao = styled.View`
    margin-top: ${({ theme }) => theme.spacing(2.5)};
`;

const TextoSecao = styled(Text)`
    font-weight: 600;
`;

const CardInstituicao = styled(Surface)`
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(2.5)};
    padding-top: ${({ theme }) => theme.spacing(2.5)};
    padding-bottom: ${({ theme }) => theme.spacing(2.5)};
    padding-left: ${({ theme }) => theme.spacing(2.5)};
    margin-top: ${({ theme }) => theme.spacing(1.25)};
    border-radius: ${({ theme }) => theme.spacing(1.25)};
`;

const ContainerDadosInstituicao = styled.View`
    padding: ${({ theme }) => theme.spacing(0.25)};
`;

const NomeInstituicao = styled(Text)`
    font-weight: bold;
`;

const LocalizacaoInstituicao = styled(Text)`
    opacity: 0.8;
`;

const ContainerBotoesAcao = styled.View`
    margin-top: auto;
    margin-bottom: ${({ theme }) => theme.spacing(1.25)};
    gap: ${({ theme }) => theme.spacing(0.625)};
`;

const BotaoAcao = styled(Button)`
    border-radius: ${({ theme }) => theme.spacing(0.625)};
`;

const InputObservacoes = styled(TextInput)`
    margin-top: ${({ theme }) => theme.spacing(1.25)};
    padding-top: ${({ theme }) => theme.spacing(1.25)};
    border-radius: ${({ theme }) => theme.spacing(0.25)};
`;

export {
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
};
