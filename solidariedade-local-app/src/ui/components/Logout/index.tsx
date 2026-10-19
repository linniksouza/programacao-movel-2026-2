import { FC } from "react";
import { Pressable } from "react-native";

import {
    IconeLogout,
    Logout as LogoutStyled,
    TextoLogout
} from "./index.styles";

const Logout: FC = () => {
    return (
        <Pressable>
            <LogoutStyled>
                <IconeLogout name="logout" size={30} />
                <TextoLogout variant="bodyLarge">
                    Sair da conta
                </TextoLogout>
            </LogoutStyled>
        </Pressable>
    );
};

export { Logout };
