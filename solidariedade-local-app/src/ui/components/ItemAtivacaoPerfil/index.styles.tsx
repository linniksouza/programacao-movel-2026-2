import { Switch, Text } from "react-native-paper";
import styled from "styled-components/native";

const ItemAtivacaoPerfil = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(1.25)};
    margin-top: ${({ theme }) => theme.spacing(2.5)};
`;

const TextoItemAtivacaoPerfil = styled(Text)`
    font-weight: bold;
`;

const SwitchItemAtivacaoPerfil = styled(Switch)`
    margin-left: auto;
`;

export {
    ItemAtivacaoPerfil,
    SwitchItemAtivacaoPerfil,
    TextoItemAtivacaoPerfil
};
