import { Surface } from "react-native-paper";
import styled from "styled-components/native";

const ListaItensDoacao = styled(Surface)`
    flex-shrink: 1;
    max-height: ${({ theme }) => theme.spacing(35)};
    overflow: hidden;
    margin-top: ${({ theme }) => theme.spacing(1.25)};
    border-radius: ${({ theme }) => theme.spacing(1.875)};
`;

export {
    ListaItensDoacao
};
