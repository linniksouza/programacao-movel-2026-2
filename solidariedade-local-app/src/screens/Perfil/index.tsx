import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Divider, Surface, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { buscarUsuario } from "@/data/api/usuarios";
import { perfilRepositoryFactory } from "@/data/asyncstorage";
import { CabecalhoPerfil } from "@/ui/components/CabecalhoPerfil";
import { ItemAtivacaoPerfil } from "@/ui/components/ItemAtivacaoPerfil";
import { ItemNavegacaoPerfil } from "@/ui/components/ItemNavegacaoPerfil";
import { Logout } from "@/ui/components/Logout";

const PerfilScreen = () => {
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
        <SafeAreaView style={styles.container}>
            <CabecalhoPerfil usuario={usuario} />

            <Surface
                elevation={2}
                style={styles.surface}
            >
                <ItemNavegacaoPerfil
                    icone="account-outline"
                    titulo="Dados Pessoais"
                />
            </Surface>

            <Surface
                elevation={2}
                style={styles.surface}
            >
                <Text style={styles.tituloPreferencias}>
                    Preferências
                </Text>

                <ItemAtivacaoPerfil
                    icone="theme-light-dark"
                    titulo="Modo Escuro"
                    ativado={modoEscuroAtivado}
                    setAtivado={onAtivarModoEscuro}
                />
                <Divider />
                <ItemAtivacaoPerfil
                    icone="bell-outline"
                    titulo="Notificações"
                    ativado={notificacoesAtivadas}
                    setAtivado={onAtivarNotificacoes}
                />
            </Surface>

            <Surface
                elevation={2}
                style={styles.surface}
            >
                <ItemNavegacaoPerfil
                    icone="lock-outline"
                    titulo="Segurança"
                />
            </Surface>

            <Surface
                elevation={2}
                style={styles.surface}
            >
                <ItemNavegacaoPerfil
                    icone="information-outline"
                    titulo="Sobre o aplicativo"
                />
            </Surface>

            <Surface
                elevation={2}
                style={styles.surface}
            >
                <Logout />
            </Surface>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    surface: {
        margin: 10,
        padding: 20,
        borderRadius: 10,
    },
    tituloPreferencias: {
        fontSize: 15,
        fontWeight: "bold"
    },
    dadosPessoais: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 20
    },
    preferencias: {
        padding: 20
    },
    modoEscuro: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 20
    },
});

export { PerfilScreen };
