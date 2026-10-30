import { FC, useRef } from "react";
import { Animated, Pressable } from "react-native";

import { Demanda } from "@/data/models/demanda.model";
import {
    CardDemanda as CardDemandaStyled,
    ContainerCardDemanda,
    ConteudoCardDemanda,
    IconeLocalizacaoInstituicao,
    ImagemInstituicao,
    LocalizacaoInstituicao,
    NecessidadeDoacao,
    NomeInstituicao,
    TextoOpaco
} from "./index.styles";

type CardDemandaProps = {
    demanda: Demanda;
    onPress: () => void;
};

const CardDemanda: FC<CardDemandaProps> = ({
    demanda,
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
            toValue: 0.95,
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
        <Pressable
            onPress={onPress}
            onPressIn={pressionar}
            onPressOut={soltar}
        >
            <Animated.View style={estiloAnimacao}>
                <CardDemandaStyled
                    testID="container-card-demanda"
                    mode="outlined"
                >
                    <ContainerCardDemanda>
                        <ImagemInstituicao source={{ uri: demanda.instituicao.imagem_principal }} />

                        <ConteudoCardDemanda>
                            <NomeInstituicao variant="titleLarge">
                                {demanda.instituicao.nome}
                            </NomeInstituicao>
                            <NecessidadeDoacao variant="bodyMedium">
                                {demanda.necessidades}
                            </NecessidadeDoacao>
                            <TextoOpaco variant="bodySmall">
                                {demanda.itens.slice(0, 1).map(i => i.nome).join(", ")}
                            </TextoOpaco>
                            <LocalizacaoInstituicao>
                                <IconeLocalizacaoInstituicao name="google-maps" size={15} />
                                <TextoOpaco variant="bodySmall">
                                    {demanda.instituicao.localizacao}
                                </TextoOpaco>
                            </LocalizacaoInstituicao>
                        </ConteudoCardDemanda>
                    </ContainerCardDemanda>
                </CardDemandaStyled>
            </Animated.View>
        </Pressable>
    );
};

export { CardDemanda };
