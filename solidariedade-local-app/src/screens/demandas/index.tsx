import { FC, useEffect, useState } from "react";

import { buscarDemandas } from "@/data/api/demandas";
import { Demanda } from "@/data/models/demanda.model";
import { ScreenContainer } from "@/screens/index.styles";
import { CabecalhoDemandas } from "@/ui/components/CabecalhoDemandas";
import { FiltroBuscaDemanda } from "@/ui/components/FiltroBuscaDemanda";
import { ListaDemandas } from "@/ui/components/ListaDemandas";
import { useSnackbar } from "@/ui/hooks/snackbar";

const DemandasScreen: FC = () => {
    const { showSnackbar } = useSnackbar();

    const [demandas, setDemandas] = useState<Demanda[]>([]);
    const [buscandoDemandas, setBuscandoDemandas] = useState(false);
    const [sentencaBusca, setSentencaBusca] = useState("");

    const onBuscarDemandas = async () => {
        try{
            const listaDemandas = await buscarDemandas();
            setDemandas([...listaDemandas]);
        }catch(e: any){
            const erro = e as Error;
            showSnackbar(erro.message, 5000);
        }
    };
    const onRefreshDemandas = async () => {
        setBuscandoDemandas(true);
        await onBuscarDemandas();
        setBuscandoDemandas(false);
    };

    const filtrarDemandas = (demanda: Demanda) => {
        const termo = sentencaBusca.trim().toLowerCase();

        if(!termo)
            return true;

        return (
            demanda.instituicao.nome.toLowerCase().includes(termo) ||
            demanda.necessidades.toLowerCase().includes(termo) ||
            demanda.itens.some(i => i.nome.toLowerCase().includes(termo)) ||
            demanda.instituicao.localizacao.toLowerCase().includes(termo)
        );
    };
    const demandasFiltradas = demandas.filter(filtrarDemandas);

    useEffect(() => {
        onBuscarDemandas();
    }, []);

    return (
        <ScreenContainer>
            {/* Cabeçalho */}
            <CabecalhoDemandas />

            {/* Filtros de busca */}
            <FiltroBuscaDemanda onFiltrarDemandas={setSentencaBusca} />

            {/* Lista de demandas */}
            <ListaDemandas
                demandas={demandasFiltradas}
                refreshing={buscandoDemandas}
                onRefresh={onRefreshDemandas}
            />
        </ScreenContainer>
    );
};

export { DemandasScreen };

