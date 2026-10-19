import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

const FiltroBuscaInstituicao = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(1.25)};
    gap: ${({ theme }) => theme.spacing()};
`;

const InputBuscaInstituicao = styled(Searchbar)`
    height: 100%;
    flex: 1;
    border: 1px solid ${({ theme }) => theme.colors.outline};
    border-radius: ${({ theme }) => theme.spacing(1.25)};
    background-color: ${({ theme }) => theme.colors.surface};
`;

export {
    FiltroBuscaInstituicao,
    InputBuscaInstituicao
};
