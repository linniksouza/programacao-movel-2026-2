import { Text } from "react-native-paper";
import styled from "styled-components/native";

const ListaDemandas = styled.View`
    flex: 1;
    margin: ${({ theme }) => `${theme.spacing(1.25)} ${theme.spacing(1.25)} 0`};
`;

const SecaoListaDemandas = styled(Text)`
    font-weight: bold;
`;

export {
    ListaDemandas,
    SecaoListaDemandas
};
