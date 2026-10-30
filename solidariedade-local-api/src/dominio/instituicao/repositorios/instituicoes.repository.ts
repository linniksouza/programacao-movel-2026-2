import { Instituicao } from "@/dominio/instituicao/entidades/instituicao.entity";
import { CnpjInstituicao } from "@/dominio/instituicao/identificadores/cnpj-instituicao.identity";

interface InstituicoesRepository {

    buscarInstituicoes(): Promise<Instituicao[]>;

    buscarInstituicao(cnpj: CnpjInstituicao): Promise<Instituicao | undefined>;

    salvarInstituicao(instituicao: Instituicao): Promise<boolean>;

}

export { InstituicoesRepository };
