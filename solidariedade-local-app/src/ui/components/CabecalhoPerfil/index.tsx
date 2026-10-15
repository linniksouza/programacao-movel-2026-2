import { StyleSheet, View } from "react-native";
import { Avatar, IconButton, Text } from "react-native-paper";

import { Usuario } from "@/data/models/usuario.model";

type CabecalhoPerfilProps = {
    usuario: Usuario;
};

const CabecalhoPerfil = ({
    usuario
}: CabecalhoPerfilProps) => {

    return (
        <View style={styles.containerCabecalho}>
            <Avatar.Image size={64} source={{ uri: usuario.urlImagem }} />

            <View>
                <Text style={styles.nomeUsuario}>
                    {usuario.nome}
                </Text>
                <Text style={styles.emailUsuario}>
                    {usuario.email}
                </Text>
            </View>

            <IconButton
                style={{ marginLeft: "auto" }}
                icon="pencil-box-outline"
                size={30}
                iconColor="#ffffff"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    containerCabecalho: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        paddingTop: 30,
        paddingBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: "#5B2DB8"
    },
    nomeUsuario: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#ffffff"
    },
    emailUsuario: {
        fontSize: 15,
        color: "#ffffff"
    }
});

export { CabecalhoPerfil };
