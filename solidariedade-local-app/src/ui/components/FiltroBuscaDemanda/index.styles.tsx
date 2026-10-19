import { Button, Searchbar } from "react-native-paper";
import styled from "styled-components/native";

const FiltroBuscaDemanda = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(1.25)};
    gap: ${({ theme }) => theme.spacing()};
`;

const InputBuscaDemanda = styled(Searchbar)`
    height: 100%;
    flex: 1;
    border: 1px solid ${({ theme }) => theme.colors.outline};
    border-radius: ${({ theme }) => theme.spacing(1.25)};
    background-color: ${({ theme }) => theme.colors.surface};
`;

const BotaoFiltroDemanda = styled(Button)`
    justify-content: center;
    padding: ${({ theme }) => theme.spacing(0.5)} 0;
    border-radius: ${({ theme }) => theme.spacing(1.25)};
`;

export {
    BotaoFiltroDemanda,
    FiltroBuscaDemanda,
    InputBuscaDemanda
};
