import {
    MaterialDesignIcons
} from "@react-native-vector-icons/material-design-icons";
import { Text } from "react-native-paper";
import styled from "styled-components/native";

const ItemNavegacaoPerfil = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(1.25)};
`;

const NomeItemNavegacaoPerfil = styled(Text)`
    font-weight: bold; 
`;

const IconeItemNavegacaoPerfil = styled(MaterialDesignIcons)`
    color: #000000;
`;

const IconeNavegacaoPerfil = styled(MaterialDesignIcons)`
    color: #000000;
    margin-left: auto;
`;

export {
    IconeItemNavegacaoPerfil,
    IconeNavegacaoPerfil,
    ItemNavegacaoPerfil,
    NomeItemNavegacaoPerfil
};
