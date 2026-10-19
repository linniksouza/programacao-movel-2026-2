import {
    MaterialDesignIcons
} from "@react-native-vector-icons/material-design-icons";
import { Text } from "react-native-paper";
import styled from "styled-components/native";

const CabecalhoHistoricoDoacoes = styled.View`
    padding: ${({ theme }) => `${theme.spacing(3.75)} ${theme.spacing(2.5)}`};
    background-color: ${({ theme }) => theme.colors.success};
`;

const HistoricoDoacoes = styled(Text)`
    color: ${({ theme }) => theme.colors.onSuccess};
    font-weight: bold;
`;

const ContainerModoOnlineOffline = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(0.625)};
    margin-top: ${({ theme }) => theme.spacing(1.25)};
`;

const IconeModoOnlineOffline = styled(MaterialDesignIcons)`
    color: ${({ theme }) => theme.colors.surface};
`;

const ModoOnlineOffline = styled(Text)`
    color: ${({ theme }) => theme.colors.onSuccess};
`;

export {
    CabecalhoHistoricoDoacoes,
    ContainerModoOnlineOffline,
    HistoricoDoacoes,
    IconeModoOnlineOffline,
    ModoOnlineOffline
};
