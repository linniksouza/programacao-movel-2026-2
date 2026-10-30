import { DoacaoLocal } from "@/data/models/doacao.model";

interface DoacoesRepository {

    salvarDoacao(doacao: DoacaoLocal): Promise<boolean>;

    buscarDoacoes(): Promise<DoacaoLocal[]>;

}

export { DoacoesRepository };
