import { Surface, Text } from "react-native-paper";
import styled from "styled-components/native";

const ContainerItensPerfil = styled(Surface)`
    margin: ${({ theme }) => theme.spacing(1.25)};
    padding: ${({ theme }) => theme.spacing(2.5)};
    border-radius: ${({ theme }) => theme.spacing(1.25)};
`;

const SecaoPreferencias = styled(Text)`
    font-weight: bold;
`;

export {
    ContainerItensPerfil,
    SecaoPreferencias
};
