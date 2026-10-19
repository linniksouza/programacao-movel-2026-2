import {
    MaterialDesignIcons
} from "@react-native-vector-icons/material-design-icons";
import { Text } from "react-native-paper";
import styled from "styled-components/native";

const Logout = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(1.25)};
`;

const IconeLogout = styled(MaterialDesignIcons)`
    color: ${({ theme }) => theme.colors.error};
`;

const TextoLogout = styled(Text)`
    font-weight: bold;
    color: ${({ theme }) => theme.colors.error};
`;

export {
    IconeLogout,
    Logout,
    TextoLogout
};
