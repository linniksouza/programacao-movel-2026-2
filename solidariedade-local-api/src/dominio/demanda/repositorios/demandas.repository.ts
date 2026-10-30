import { DemandaDoacao } from "@/dominio/demanda/agregados/demanda.aggregate";
import { IdDemandaDoacao } from "@/dominio/demanda/identificadores/id-demanda.identity";

interface DemandasDoacoesRepository {

    buscarDemandas(): Promise<DemandaDoacao[]>;

    buscarDemanda(id: IdDemandaDoacao): Promise<DemandaDoacao | undefined>;

    salvarDemanda(demanda: DemandaDoacao): Promise<boolean>;

}

export { DemandasDoacoesRepository };
