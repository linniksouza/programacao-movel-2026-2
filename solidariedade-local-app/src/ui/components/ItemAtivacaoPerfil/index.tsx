import {
    MaterialDesignIcons,
    MaterialDesignIconsIconName
} from "@react-native-vector-icons/material-design-icons";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Text } from "react-native-paper";

type ItemAtivacaoPerfilProps = {
    icone: MaterialDesignIconsIconName;
    titulo: string;
    ativado: boolean;
    setAtivado: (value: boolean) => void;
};

const ItemAtivacaoPerfil: FC<ItemAtivacaoPerfilProps> = ({
    icone,
    titulo,
    ativado,
    setAtivado
}) => {
    return (
        <View style={styles.areaAtivacao}>
            <MaterialDesignIcons name={icone} size={30} />
            <Text style={styles.tituloAtivacao}>
                {titulo}
            </Text>
            <Switch
                testID="switch-ativar-desativar"
                value={ativado}
                onValueChange={setAtivado}
                style={{ marginLeft: "auto" }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    areaAtivacao: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 20
    },
    tituloAtivacao: {
        fontSize: 15,
        fontWeight: "bold"
    }
});

export { ItemAtivacaoPerfil };
