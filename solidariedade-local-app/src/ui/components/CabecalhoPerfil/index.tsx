import { FC } from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";

import { Usuario } from "@/data/models/usuario.model";
import {
    BotaoEditarDados,
    CabecalhoPerfil as CabecalhoPerfilStyled,
    EmailUsuario,
    NomeUsuario
} from "./index.styles";

type CabecalhoPerfilProps = {
    usuario: Usuario;
};

const CabecalhoPerfil: FC<CabecalhoPerfilProps> = ({
    usuario
}) => {

    return (
        <CabecalhoPerfilStyled>
            <Avatar.Image
                size={64}
                source={{ uri: usuario.urlImagem }}
            />

            <View>
                <NomeUsuario variant="titleLarge">
                    {usuario.nome}
                </NomeUsuario>
                <EmailUsuario>
                    {usuario.email}
                </EmailUsuario>
            </View>

            <BotaoEditarDados
                icon="pencil-box-outline"
                iconColor="#FFFFFF"
                size={30}
            />
        </CabecalhoPerfilStyled>
    );
};

export { CabecalhoPerfil };
