interface PreferenciasPerfil {
    modoEscuro: boolean;
    notificacoes: boolean;
}

interface PerfilRepository {

    buscarPreferencias(): Promise<PreferenciasPerfil>;

    salvarPreferencias(preferencias: PreferenciasPerfil): Promise<void>;

}

export {
    PerfilRepository,
    PreferenciasPerfil
};
