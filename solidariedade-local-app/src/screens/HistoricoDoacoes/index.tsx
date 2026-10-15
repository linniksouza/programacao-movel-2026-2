import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { doacoesRepositoryFactory } from "@/data/drizzle";
import { Doacao } from "@/data/models/doacao.model";
import { CabecalhoHistoricoDoacoes } from "@/ui/components/CabecalhoHistoricoDoacoes";
import { CardDoacaoFeita } from "@/ui/components/CardDoacaoFeita";

const HistoricoDoacoesScreen = () => {
    const doacoesRepository = doacoesRepositoryFactory();
    const [doacoes, setDoacoes] = useState<Doacao[]>([]);
    const [atualizando, setAtualizando] = useState(false);

    const buscarDoacoes = async () => {
        const doacoesEntity = await doacoesRepository.buscarDoacoes();
        setDoacoes([...doacoesEntity]);
    };
    const onRefreshDoacoes = async () => {
        setAtualizando(true);
        setTimeout(async () => {
            await buscarDoacoes();
            setAtualizando(false);
        }, 3000);
    };
    const renderItemDoado = ({ item }: { item: Doacao }) => {
        return <CardDoacaoFeita doacao={item} />;
    };
    const keyExtractorItemDoado = (item: Doacao) => item.id!;

    useEffect(() => {
        buscarDoacoes();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <CabecalhoHistoricoDoacoes />

            <FlatList
                testID="lista-doacoes-feitas"
                data={doacoes}
                renderItem={renderItemDoado}
                keyExtractor={keyExtractorItemDoado}
                refreshing={atualizando}
                onRefresh={onRefreshDoacoes}
                ListEmptyComponent={
                    <Text variant="headlineMedium">
                        Você ainda não fez nenhuma doação!
                    </Text>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export { HistoricoDoacoesScreen };
