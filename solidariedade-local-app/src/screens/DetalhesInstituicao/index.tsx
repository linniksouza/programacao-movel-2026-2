import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { Chip } from "react-native-paper";

import { InstituicoesStackParams } from "@/navigation/Stack";
import { ScreenContainer } from "@/screens/index.styles";
import {
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
} from "./index.styles";

type DetalhesInstituicaoScreenProps = NativeStackScreenProps<InstituicoesStackParams, "DetalhesInstituicao">;

const DetalhesInstituicaoScreen: FC<DetalhesInstituicaoScreenProps> = ({
    route
}) => {
    const { instituicao } = route.params;

    return (
        <ScreenContainer>
            <ImagemCapa source={{ uri: instituicao.imagem_capa }} />

            <DadosInstituicao elevation={2}>
                <ImagemPrincipal
                    size={90}
                    source={{ uri: instituicao.imagem_principal }}
                />

                <ContainerDadosInstituicao>
                    <NomeInstituicao variant="headlineSmall">
                        {instituicao.nome}
                    </NomeInstituicao>

                    <AreasAtuacao>
                        {instituicao.areas_atuacao.map((area) => (
                            <Chip key={area}>{area}</Chip>
                        ))}
                    </AreasAtuacao>

                    <SiteLocalizacao>
                        <ContainerSiteLocalizacao>
                            <IconeSiteLocalizacao name="google-maps" size={20} />
                            <TextoSiteLocalizacao variant="titleMedium">
                                {instituicao.localizacao}
                            </TextoSiteLocalizacao>
                        </ContainerSiteLocalizacao>

                        <ContainerSiteLocalizacao>
                            <IconeSiteLocalizacao name="earth" size={20} />
                            <TextoSiteLocalizacao variant="titleMedium">
                                {instituicao.endereco_site}
                            </TextoSiteLocalizacao>
                        </ContainerSiteLocalizacao>
                    </SiteLocalizacao>

                    <ContainerSobreInstituicao>
                        <SecaoSobreInstituicao variant="titleMedium">
                            Sobre
                        </SecaoSobreInstituicao>
                        <TextoSobreInstituicao variant="bodyLarge">
                            {instituicao.biografia}
                        </TextoSobreInstituicao>
                    </ContainerSobreInstituicao>
                </ContainerDadosInstituicao>
            </DadosInstituicao>
        </ScreenContainer>
    );
};

export { DetalhesInstituicaoScreen };

