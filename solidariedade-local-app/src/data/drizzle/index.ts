import { DrizzleDoacoesRepository } from "./doacoes";

const doacoesRepositoryFactory = () => DrizzleDoacoesRepository.singleton();

export { doacoesRepositoryFactory };
