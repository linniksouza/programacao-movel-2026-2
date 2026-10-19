import { FC, useEffect, useState } from "react";
import { Divider } from "react-native-paper";

import { buscarUsuario } from "@/data/api/usuarios";
import { perfilRepositoryFactory } from "@/data/asyncstorage";
import { ScreenContainer } from "@/screens/index.styles";
import { CabecalhoPerfil } from "@/ui/components/CabecalhoPerfil";
import { ItemAtivacaoPerfil } from "@/ui/components/ItemAtivacaoPerfil";
import { ItemNavegacaoPerfil } from "@/ui/components/ItemNavegacaoPerfil";
import { Logout } from "@/ui/components/Logout";
import {
    ContainerItensPerfil,
    SecaoPreferencias
} from "./index.styles";

const PerfilScreen: FC = () => {
    const perfilRepository = perfilRepositoryFactory();
    const usuario = buscarUsuario();

    const [modoEscuroAtivado, setModoEscuroAtivado] = useState(false);
    const [notificacoesAtivadas, setNotificacoesAtivadas] = useState(false);

    const onAtivarModoEscuro = async (ativar: boolean) => {
        setModoEscuroAtivado(ativar);
        await perfilRepository.salvarPreferencias({
            modoEscuro: ativar,
            notificacoes: notificacoesAtivadas
        });
    };
    const onAtivarNotificacoes = async (ativar: boolean) => {
        setNotificacoesAtivadas(ativar);
        await perfilRepository.salvarPreferencias({
            modoEscuro: modoEscuroAtivado,
            notificacoes: ativar
        });
    };

    useEffect(() => {
        (async () => {
            const preferencias = await perfilRepository.buscarPreferencias();
            setModoEscuroAtivado(preferencias.modoEscuro);
            setNotificacoesAtivadas(preferencias.notificacoes);
        })();
    }, []);

    return (
        <ScreenContainer>
            <CabecalhoPerfil usuario={usuario} />

            <ContainerItensPerfil elevation={2}>
                <ItemNavegacaoPerfil
                    icone="account-outline"
                    titulo="Dados Pessoais"
                />
            </ContainerItensPerfil>

            <ContainerItensPerfil elevation={2}>
                <SecaoPreferencias variant="bodyLarge">
                    Preferências
                </SecaoPreferencias>

                <ItemAtivacaoPerfil
                    icone="theme-light-dark"
                    titulo="Modo Escuro"
                    ativado={modoEscuroAtivado}
                    setAtivado={onAtivarModoEscuro}
                />
                <Divider bold />
                <ItemAtivacaoPerfil
                    icone="bell-outline"
                    titulo="Notificações"
                    ativado={notificacoesAtivadas}
                    setAtivado={onAtivarNotificacoes}
                />
            </ContainerItensPerfil>

            <ContainerItensPerfil elevation={2}>
                <ItemNavegacaoPerfil
                    icone="lock-outline"
                    titulo="Segurança"
                />
            </ContainerItensPerfil>

            <ContainerItensPerfil elevation={2}>
                <ItemNavegacaoPerfil
                    icone="information-outline"
                    titulo="Sobre o aplicativo"
                />
            </ContainerItensPerfil>

            <ContainerItensPerfil elevation={2}>
                <Logout />
            </ContainerItensPerfil>
        </ScreenContainer>
    )
};

export { PerfilScreen };
