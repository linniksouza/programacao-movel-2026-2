import { Doacao } from "../../doacao/agregados/doacao.aggregate";
import { CpfDoador } from "../identificadores/cpf-doador.identity";

interface DoacoesRepository {

    buscarDoacoes(cpfDoador: CpfDoador): Promise<Doacao[]>;

    salvarDoacao(doacao: Doacao): Promise<boolean>;

}

export { DoacoesRepository };
