import {
    MaterialDesignIcons,
    MaterialDesignIconsIconName
} from "@react-native-vector-icons/material-design-icons";
import { FC } from "react";

import {
    ItemAtivacaoPerfil as ItemAtivacaoPerfilStyled,
    SwitchItemAtivacaoPerfil,
    TextoItemAtivacaoPerfil
} from "./index.styles";

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
        <ItemAtivacaoPerfilStyled>
            <MaterialDesignIcons name={icone} size={30} />
            <TextoItemAtivacaoPerfil variant="bodyLarge">
                {titulo}
            </TextoItemAtivacaoPerfil>
            <SwitchItemAtivacaoPerfil
                testID="switch-ativar-desativar"
                value={ativado}
                onValueChange={setAtivado}
            />
        </ItemAtivacaoPerfilStyled>
    );
};

export { ItemAtivacaoPerfil };
