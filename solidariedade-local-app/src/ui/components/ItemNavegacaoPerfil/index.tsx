import {
    MaterialDesignIconsIconName
} from "@react-native-vector-icons/material-design-icons";
import { FC } from "react";
import { Pressable } from "react-native";

import {
    IconeItemNavegacaoPerfil,
    IconeNavegacaoPerfil,
    ItemNavegacaoPerfil as ItemNavegacaoPerfilStyled,
    NomeItemNavegacaoPerfil
} from "./index.styles";

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
            onPress={onNavigate}
        >
            <ItemNavegacaoPerfilStyled>
                <IconeItemNavegacaoPerfil name={icone} size={30} />
                <NomeItemNavegacaoPerfil variant="bodyLarge">
                    {titulo}
                </NomeItemNavegacaoPerfil>
                <IconeNavegacaoPerfil name="chevron-right" size={30} />
            </ItemNavegacaoPerfilStyled>
        </Pressable>
    );
};

export { ItemNavegacaoPerfil };
