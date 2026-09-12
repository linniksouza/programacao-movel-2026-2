import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

type ItemDoacaoProps = {
    item: string;
};

const ItemDoacao = ({ item }: ItemDoacaoProps) => {

    return (
        <View style={styles.itemDoacao}>
            <Text>{item}</Text>

            <View style={styles.botoesAcaoItem}>
                <IconButton
                    icon="minus"
                    mode="outlined"
                    disabled
                />
                <Text>0</Text>
                <IconButton
                    icon="plus"
                    mode="outlined"
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
