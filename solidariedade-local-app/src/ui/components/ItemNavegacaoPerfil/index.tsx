import {
    MaterialDesignIcons,
    MaterialDesignIconsIconName
} from "@react-native-vector-icons/material-design-icons";
import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

type ItemNavegacaoPerfilProps = {
    icone: MaterialDesignIconsIconName;
    titulo: string;
    onNavigate?: () => void;
};

const ItemNavegacaoPerfil: FC<ItemNavegacaoPerfilProps> = ({
    icone,
    titulo,
    onNavigate
}) => {
    return (
        <Pressable
            testID="btn-navegar-item"
            style={styles.areaToqueItem}
            onPress={onNavigate}
        >
            <MaterialDesignIcons name={icone} size={30} />
            <Text style={styles.tituloItem}>
                {titulo}
            </Text>
            <MaterialDesignIcons
                name="chevron-right"
                size={30}
                style={{ marginLeft: "auto" }}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    areaToqueItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    tituloItem: {
        fontSize: 15,
        fontWeight: "bold"
    }
});


export { ItemNavegacaoPerfil };

