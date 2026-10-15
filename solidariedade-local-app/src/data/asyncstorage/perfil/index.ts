import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    PerfilRepository,
    PreferenciasPerfil
} from "@/data/repositories/perfil";
import { KEY_PREFIX } from "@/data/storage";

class AsyncStoragePerfilRepository implements PerfilRepository {

    private static _instancia?: PerfilRepository;

    private constructor() {}

    public async buscarPreferencias(): Promise<PreferenciasPerfil> {
        const data = await AsyncStorage.getItem(`${KEY_PREFIX}:preferencias`);

        if(!data){
            return {
                modoEscuro: false,
                notificacoes: false
            };
        }
        
        return JSON.parse(data) as PreferenciasPerfil;
    }

    public async salvarPreferencias(preferencias: PreferenciasPerfil): Promise<void> {
        await AsyncStorage.setItem(
            `${KEY_PREFIX}:preferencias`,
            JSON.stringify(preferencias)
        );
    }

    public static singleton(): PerfilRepository {
        if(!AsyncStoragePerfilRepository._instancia)
            AsyncStoragePerfilRepository._instancia = new AsyncStoragePerfilRepository();

        return AsyncStoragePerfilRepository._instancia;
    }
}

export { AsyncStoragePerfilRepository };
