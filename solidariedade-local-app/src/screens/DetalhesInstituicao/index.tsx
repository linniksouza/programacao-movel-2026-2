import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, StyleSheet, View } from "react-native";
import { Avatar, Chip, Surface, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { buscarInstituicao } from "@/data/api/instituicoes";
import { InstituicoesStackParams } from "@/navigation/Stack";

type DetalhesInstituicaoScreenProps = NativeStackScreenProps<InstituicoesStackParams, "DetalhesInstituicao">;

const DetalhesInstituicaoScreen = ({ route }: DetalhesInstituicaoScreenProps) => {
    const instituicao = buscarInstituicao(route.params.idInstituicao);

    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.imagemCapa}
                source={{ uri: instituicao?.imagemCapa }}
            />

            <Surface
                style={styles.infosInstituicao}
                elevation={2}
            >
                <Avatar.Image
                    size={90}
                    source={{ uri: instituicao?.imagemPrincipal }}
                    style={styles.imagemPrincipal}
                />

                <View style={styles.dadosInstituicao}>
                    <Text variant="headlineSmall" style={styles.nomeInstituicao}>
                        {instituicao?.nome}
                    </Text>

                    <View style={styles.containerAreasAtuacao}>
                        {instituicao?.areasAtuacao.map((area) => (
                            <Chip key={area}>{area}</Chip>
                        ))}
                    </View>

                    <View style={styles.containerSiteLocalizacao}>
                        <Text variant="titleMedium">
                            <MaterialDesignIcons name="google-maps" size={20} color="#a2a2a2" />
                            {instituicao?.localizacao}
                        </Text>
                        <Text variant="titleMedium">
                            <MaterialDesignIcons name="earth" size={20} color="#a2a2a2" />
                            {instituicao?.enderecoSite}
                        </Text>
                    </View>
                </View>

                <View style={styles.containerSobre}>
                    <Text variant="titleMedium" style={styles.tituloSecaoSobre}>
                        Sobre
                    </Text>
                    <Text variant="bodyLarge" style={styles.textoSecaoSobre}>
                        {instituicao?.biografia}
                    </Text>
                </View>
            </Surface>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imagemCapa: {
        width: "auto",
        height: 200,
        resizeMode: "stretch"
    },
    infosInstituicao: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        height: "100%",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -20,
    },
    imagemPrincipal: {
        marginTop: -40,
        marginBottom: 12,
        backgroundColor: "#ffffff",
    },
    dadosInstituicao: {
        gap: 8
    },
    nomeInstituicao: {
        fontWeight: "bold"
    },
    containerAreasAtuacao: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
        marginVertical: 10,
    },
    containerSiteLocalizacao: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 8
    },
    containerSobre: {
        marginTop: 24
    },
    tituloSecaoSobre: {
        fontWeight: "bold"
    },
    textoSecaoSobre: {
        textAlign: "justify",
        marginTop: 8
    }
});

export { DetalhesInstituicaoScreen };

