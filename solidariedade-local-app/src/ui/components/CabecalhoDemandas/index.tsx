import { FC } from "react";
import { IconButton } from "react-native-paper";

import {
    CabecalhoDemandas as CabecalhoDemandasStyled,
    ChamadoDoacao,
    ContainerCabecalho,
    SaudacaoUsuario
} from "./index.styles";

const CabecalhoDemandas: FC = () => {

    return (
        <CabecalhoDemandasStyled testID="container-cabecalho">
            <ContainerCabecalho>
                <SaudacaoUsuario variant="titleLarge">
                    Olá, Linnik!
                </SaudacaoUsuario>
                <ChamadoDoacao variant="bodyMedium">
                    Veja as necessidades de hoje
                </ChamadoDoacao>
            </ContainerCabecalho>

            <ContainerCabecalho>
                <IconButton
                    icon="bell-outline"
                    iconColor="#ffffff"
                    size={30}
                />
            </ContainerCabecalho>
        </CabecalhoDemandasStyled>
    );
};

export { CabecalhoDemandas };

