import { Doador } from "@/dominio/doador/entidades/doador.entity";
import { CpfDoador } from "@/dominio/doador/identificadores/cpf-doador.identity";

interface DoadoresRepository {

    buscarDoador(key: CpfDoador | string): Promise<Doador | undefined>;

    salvarDoador(doador: Doador): Promise<boolean>;

}

export { DoadoresRepository };
