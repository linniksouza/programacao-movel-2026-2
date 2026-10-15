import { AsyncStoragePerfilRepository } from "./perfil";

export const perfilRepositoryFactory = () => AsyncStoragePerfilRepository.singleton();
