import { Instituicao } from "@/data/models/instituicao.model";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Avatar, IconButton, Text } from "react-native-paper";

type CardInstituicaoProps = {
    instituicao: Instituicao;
    onPress: () => void;
};

const CardInstituicao = ({ instituicao, onPress }: CardInstituicaoProps) => {
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
            toValue: 0.8,
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
        <View
            testID="container-card-instituicao"
            style={styles.cardInstituicao}
        >
            <Avatar.Image
                source={{ uri: instituicao.imagemPrincipal }}
            />

            <View style={{ width: "60%" }}>
                <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                    {instituicao.nome}
                </Text>
                <View style={styles.localizacaoInstituicao}>
                    <MaterialDesignIcons name="google-maps" size={10} color="#c3c3c3" />
                    <Text variant="bodySmall">
                        {instituicao.localizacao}
                    </Text>
                </View>
            </View>

            <Animated.View style={estiloAnimacao}>
                <IconButton
                    testID="btn-detalhes-instituicao"
                    icon="eye"
                    style={{ marginStart: "auto" }}
                    onPressIn={pressionar}
                    onPressOut={soltar}
                    onPress={onPress}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardInstituicao: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        marginVertical: 10
    },
    localizacaoInstituicao: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    }
});

export { CardInstituicao };
