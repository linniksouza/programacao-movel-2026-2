import { FC, useState } from "react";

import { buscarDemandas } from "@/data/api/demandas";
import { Demanda } from "@/data/models/demanda.model";
import { ScreenContainer } from "@/screens/index.styles";
import { CabecalhoDemandas } from "@/ui/components/CabecalhoDemandas";
import { FiltroBuscaDemanda } from "@/ui/components/FiltroBuscaDemanda";
import { ListaDemandas } from "@/ui/components/ListaDemandas";

const DemandasScreen: FC = () => {
    const demandas = buscarDemandas();
    const [sentencaBusca, setSentencaBusca] = useState("");

    const filtrarDemandas = (demanda: Demanda) => {
        const termo = sentencaBusca.trim().toLowerCase();

        if(!termo)
            return true;

        return (
            demanda.instituicao.nome.toLowerCase().includes(termo) ||
            demanda.necessidadesInstituicao.toLowerCase().includes(termo) ||
            demanda.itensDoacao.some(i => i.nome.toLowerCase().includes(termo)) ||
            demanda.instituicao.localizacao.toLowerCase().includes(termo)
        );
    };

    const demandasFiltradas = demandas.filter(filtrarDemandas);

    return (
        <ScreenContainer>
            {/* Cabeçalho */}
            <CabecalhoDemandas />

            {/* Filtros de busca */}
            <FiltroBuscaDemanda onFiltrarDemandas={setSentencaBusca} />

            {/* Lista de demandas */}
            <ListaDemandas demandas={demandasFiltradas} />
        </ScreenContainer>
    );
};

export { DemandasScreen };
