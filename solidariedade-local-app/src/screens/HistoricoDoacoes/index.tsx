import { FC, useCallback, useEffect, useState } from "react";

import { doacoesRepositoryFactory } from "@/data/drizzle";
import { Doacao } from "@/data/models/doacao.model";
import { ScreenContainer } from "@/screens/index.styles";
import { CabecalhoHistoricoDoacoes } from "@/ui/components/CabecalhoHistoricoDoacoes";
import { ListaDoacoesFeitas } from "@/ui/components/ListaDoacoesFeitas";

const HistoricoDoacoesScreen: FC = () => {
    const doacoesRepository = doacoesRepositoryFactory();

    const [doacoes, setDoacoes] = useState<Doacao[]>([]);
    const [buscandoDoacoes, setBuscandoDoacoes] = useState(false);

    const buscarDoacoes = async () => {
        const doacoesEntity = await doacoesRepository.buscarDoacoes();
        setDoacoes([...doacoesEntity]);
    };
    const onRefreshBuscarDoacoes = useCallback(async () => {
        setBuscandoDoacoes(true);
        setTimeout(async () => {
            await buscarDoacoes();
            setBuscandoDoacoes(false);
        }, 3000);
    }, []);

    useEffect(() => {
        buscarDoacoes();
    }, []);

    return (
        <ScreenContainer>
            <CabecalhoHistoricoDoacoes />

            <ListaDoacoesFeitas
                doacoes={doacoes}
                refreshing={buscandoDoacoes}
                onRefresh={onRefreshBuscarDoacoes}
            />
        </ScreenContainer>
    );
};

export { HistoricoDoacoesScreen };
