import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { buscarInstituicoes } from "@/data/api/instituicoes";
import { Instituicao } from "@/data/models/instituicao.model";
import { FiltroBuscaInstituicao } from "@/ui/components/FiltroBuscaInstituicao";
import { ListaInstituicoes } from "@/ui/components/ListaInstituicoes";

const InstituicoesScreen = () => {
    const instituicoes = buscarInstituicoes();
    const [sentencaBusca, setSentencaBusca] = useState("");

    const filtrarInstituicoes = (instituicao: Instituicao): boolean => {
        const termo = sentencaBusca.trim().toLowerCase();

        if (!termo)
            return true;

        return (
            instituicao.nome.toLowerCase().includes(termo) ||
            instituicao.localizacao.toLowerCase().includes(termo)
        );
    };
    const instituicoesFiltradas = instituicoes.filter(filtrarInstituicoes);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cabecalho}>
                <Text style={{ color: "#ffffff", fontWeight: "bold" }} variant="titleLarge">Instituições</Text>
            </View>

            <Surface style={styles.instituicoes} elevation={2}>
                <FiltroBuscaInstituicao onFiltrarInstituicoes={setSentencaBusca} />

                <ListaInstituicoes instituicoes={instituicoesFiltradas} />
            </Surface>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
        backgroundColor: "#5B2DB8"
    },
    cabecalho: {
        padding: 20,
        backgroundColor: "#5B2DB8"
    },
    instituicoes: {
        padding: 10,
        height: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
});

export { InstituicoesScreen };
