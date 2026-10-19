import { Surface } from "react-native-paper";
import styled from "styled-components/native";

const CardDoacaoFeita = styled(Surface)`
    flex-direction: row;
    align-items: center;
    margin: ${({ theme }) => theme.spacing(1.25)};
    padding: ${({ theme }) => theme.spacing(2.5)};
    border-radius: ${({ theme }) => theme.spacing(1.875)};
`;

const ContainerDadosDoacao = styled.View`
    margin-left: ${({ theme }) => theme.spacing(1.25)};
`;

const ContainerMomentoDoacao = styled.View`
    margin-left: auto;
`;

export {
    CardDoacaoFeita,
    ContainerDadosDoacao,
    ContainerMomentoDoacao
};
