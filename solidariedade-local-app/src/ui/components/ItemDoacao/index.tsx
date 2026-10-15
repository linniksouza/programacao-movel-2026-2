import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

import { ItemDoacaoDemanda } from "@/data/models/demanda.model";

type ItemDoacaoProps = {
    item: ItemDoacaoDemanda;
    quantidade: number;
    setQuantidade: (value: number) => void;
};

const ItemDoacao = ({
    item,
    quantidade,
    setQuantidade
}: ItemDoacaoProps) => {
    const onDiminuir = () => {
        if(quantidade > 0)
            setQuantidade(quantidade - 1);
    };
    const onAumentar = () => {
        if(item.qtdMaxima){
            if(quantidade < item.qtdMaxima)
                setQuantidade(quantidade + 1);
        }else{
            setQuantidade(quantidade + 1);
        }
    };

    return (
        <View
            testID="container-item-doacao"
            style={styles.itemDoacao}
        >
            <Text>
                {item.nome} ({item.unidadeMedida})
            </Text>

            <View style={styles.botoesAcaoItem}>
                <IconButton
                    testID="btn-diminuir-qtd"
                    icon="minus"
                    mode="outlined"
                    onPress={onDiminuir}
                    disabled={quantidade === 0}
                />
                <Text>
                    {quantidade}
                </Text>
                <IconButton
                    testID="btn-aumentar-qtd"
                    icon="plus"
                    mode="outlined"
                    onPress={onAumentar}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemDoacao: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    botoesAcaoItem: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    }
});

export { ItemDoacao };
