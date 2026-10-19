import { Text } from "react-native-paper";
import styled from "styled-components/native";

const ListaDoacoesFeitas = styled.View`
    flex: 1;
    margin: ${({ theme }) => theme.spacing(1.25)};
`;

const TextoSemDoacao = styled(Text)`
    font-weight: 400;
    text-align: justify;
`;

export {
    ListaDoacoesFeitas,
    TextoSemDoacao
};
