import { Text } from "react-native-paper";
import styled from "styled-components/native";

const ItemDoacao = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const DadosItemDoacao = styled(Text)`
    font-weight: bold;
    margin-left: ${({ theme }) => theme.spacing(2.5)};
    margin-top: ${({ theme }) => theme.spacing(1.875)};
    margin-bottom: ${({ theme }) => theme.spacing(1.875)};
`;

const ControlesQuantidadeItemDoacao = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const QuantidadeItemDoacao = styled(Text)`
    width: ${({ theme }) => theme.spacing(2.5)};
    text-align: center;
    font-weight: bold;
`;

export {
    ControlesQuantidadeItemDoacao,
    DadosItemDoacao,
    ItemDoacao,
    QuantidadeItemDoacao
};
