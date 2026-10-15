import { Doacao } from "@/data/models/doacao.model";

interface DoacoesRepository {

    salvarDoacao(doacao: Doacao): Promise<boolean>;

    buscarDoacoes(): Promise<Doacao[]>;

}

export { DoacoesRepository };
