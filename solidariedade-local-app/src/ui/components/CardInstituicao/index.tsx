import { FC, useRef } from "react";
import { Animated } from "react-native";
import { Avatar, IconButton } from "react-native-paper";

import { Instituicao } from "@/data/models/instituicao.model";
import {
    CardInstituicao as CardInstituicaoStyled,
    ContainerDadosInstituicao,
    IconeLocalizacao,
    LocalizacaoInstituicao,
    NomeInstituicao,
    TextoOpaco
} from "./index.styles";

type CardInstituicaoProps = {
    instituicao: Instituicao;
    onPress: () => void;
};

const CardInstituicao: FC<CardInstituicaoProps> = ({
    instituicao,
    onPress
}) => {
    const escala = useRef(new Animated.Value(1)).current;
    const estiloAnimacao = {
        transform: [
            {
                scale: escala
            }
        ]
    };

    const pressionar = () => {
        Animated.spring(escala, {
            toValue: 0.97,
            useNativeDriver: true
        }).start();
    };
    const soltar = () => {
        Animated.spring(escala, {
            toValue: 1,
            useNativeDriver: true
        }).start();
    };

    return (
        <Animated.View style={estiloAnimacao}>
            <CardInstituicaoStyled testID="container-card-instituicao">
                <Avatar.Image source={{ uri: instituicao.imagemPrincipal }} />

                <ContainerDadosInstituicao>
                    <NomeInstituicao variant="bodyLarge">
                        {instituicao.nome}
                    </NomeInstituicao>

                    <LocalizacaoInstituicao>
                        <IconeLocalizacao name="map-marker" size={10} />
                        <TextoOpaco variant="bodySmall">
                            {instituicao.localizacao}
                        </TextoOpaco>
                    </LocalizacaoInstituicao>
                </ContainerDadosInstituicao>

                
                <IconButton
                    testID="btn-detalhes-instituicao"
                    icon="eye"
                    onPressIn={pressionar}
                    onPressOut={soltar}
                    onPress={onPress}
                />
            </CardInstituicaoStyled>
        </Animated.View>
    );
};

export { CardInstituicao };
