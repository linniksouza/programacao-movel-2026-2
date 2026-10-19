import { FC } from "react";

import {
    CabecalhoHistoricoDoacoes as CabecalhoHistoricoDoacoesStyled,
    ContainerModoOnlineOffline,
    HistoricoDoacoes,
    IconeModoOnlineOffline,
    ModoOnlineOffline
} from "./index.styles";

const CabecalhoHistoricoDoacoes: FC = () => {

    return (
        <CabecalhoHistoricoDoacoesStyled>
            <HistoricoDoacoes variant="titleLarge">
                Histórico de Doações
            </HistoricoDoacoes>

            <ContainerModoOnlineOffline>
                <IconeModoOnlineOffline name="cloud-off-outline" size={24} />
                <ModoOnlineOffline variant="bodyLarge">
                    Modo offline
                </ModoOnlineOffline>
            </ContainerModoOnlineOffline>
        </CabecalhoHistoricoDoacoesStyled>
    );
};

export { CabecalhoHistoricoDoacoes };
