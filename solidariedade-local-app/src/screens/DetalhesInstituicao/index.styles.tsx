import {
    MaterialDesignIcons
} from "@react-native-vector-icons/material-design-icons";
import { Avatar, Surface, Text } from "react-native-paper";
import styled from "styled-components/native";

const ImagemCapa = styled.Image.attrs({
    resizeMode: "stretch"
})`
    width: auto;
    height: 200px;
`;

const DadosInstituicao = styled(Surface)`
    padding: ${({ theme }) => `0 ${theme.spacing(2.5)} ${theme.spacing(2.5)}`};
    height: 100%;
    border-top-left-radius: ${({ theme }) => theme.spacing(3)};
    border-top-right-radius: ${({ theme }) => theme.spacing(3)};
    margin-top: ${({ theme }) => theme.spacing(-2.5)};
`;

const ImagemPrincipal = styled(Avatar.Image)`
    margin-top: ${({ theme }) => theme.spacing(-5)};
    margin-bottom: ${({ theme }) => theme.spacing(1.5)};
    background-color: ${({ theme }) => theme.colors.surface};
`;

const ContainerDadosInstituicao = styled.View`
    gap: ${({ theme }) => theme.spacing()};
`;

const NomeInstituicao = styled(Text)`
    font-weight: bold;
`;

const AreasAtuacao = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing(0.625)};
    margin: ${({ theme }) => `${theme.spacing(1.25)} 0`};
`;

const SiteLocalizacao = styled.View`
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing()};
`;

const ContainerSiteLocalizacao = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(0.625)};
`;

const TextoSiteLocalizacao = styled(Text)`
    font-weight: 400;
`;

const IconeSiteLocalizacao = styled(MaterialDesignIcons)`
    color: ${({ theme }) => theme.colors.outline};
`;

const ContainerSobreInstituicao = styled.View`
    margin-top: ${({ theme }) => theme.spacing(2)};
`;

const SecaoSobreInstituicao = styled(Text)`
    font-weight: bold;
`;

const TextoSobreInstituicao = styled(Text)`
    text-align: justify;
    margin-top: ${({ theme }) => theme.spacing()};
`;

export {
    AreasAtuacao,
    ContainerDadosInstituicao,
    ContainerSiteLocalizacao,
    ContainerSobreInstituicao,
    DadosInstituicao,
    IconeSiteLocalizacao,
    ImagemCapa,
    ImagemPrincipal,
    NomeInstituicao,
    SecaoSobreInstituicao,
    SiteLocalizacao,
    TextoSiteLocalizacao,
    TextoSobreInstituicao
};
