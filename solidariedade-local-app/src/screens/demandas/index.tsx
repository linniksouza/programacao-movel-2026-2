import { useState } from "react";
import { StyleSheet } from "react-native";
import { Surface } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { buscarDemandas } from "@/data/api/demandas";
import { Demanda } from "@/data/models/demanda.model";
import { Cabecalho } from "@/ui/components/Cabecalho";
import { FiltroBuscaDemanda } from "@/ui/components/FiltroBuscaDemanda";
import { ListaDemandas } from "@/ui/components/ListaDemandas";

const DemandasScreen = () => {
    const demandas = buscarDemandas();
    const [sentencaBusca, setSentencaBusca] = useState("");

    const filtrarDemandas = (demanda: Demanda) => {
        const termo = sentencaBusca.trim().toLowerCase();

        if(!termo)
            return true;

        return (
            demanda.nomeInstituicao.toLowerCase().includes(termo) ||
            demanda.necessidadesInstituicao.toLowerCase().includes(termo) ||
            demanda.itensDoacao.toLowerCase().includes(termo) ||
            demanda.localizacaoInstituicao.toLowerCase().includes(termo)
        );
    };

    const demandasFiltradas = demandas.filter(filtrarDemandas);

    return (
        <SafeAreaView style={styles.container}>
            <Surface style={styles.surface} elevation={0}>
                {/* Cabeçalho */}
                <Cabecalho />

                {/* Filtros de busca */}
                <FiltroBuscaDemanda onFiltrarDemandas={setSentencaBusca} />

                {/* Lista de demandas */}
                <ListaDemandas demandas={demandasFiltradas} />
            </Surface>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    surface: {
        flex: 1
    }
});

export { DemandasScreen };
