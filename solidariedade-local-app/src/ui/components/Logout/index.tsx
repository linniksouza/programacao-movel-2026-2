import {
    MaterialDesignIcons
} from "@react-native-vector-icons/material-design-icons";
import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const Logout: FC = () => {
    return (
        <Pressable style={styles.areaLogout}>
            <MaterialDesignIcons name="logout" size={30} color="#ff0000" />
            <Text style={styles.tituloLogout}>
                Sair da conta
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    areaLogout: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    tituloLogout: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#ff0000"
    }
});

export { Logout };
