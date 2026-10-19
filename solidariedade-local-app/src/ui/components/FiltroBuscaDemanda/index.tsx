import { FC, useState } from "react";

import {
    BotaoFiltroDemanda,
    FiltroBuscaDemanda as FiltroBuscaDemandaStyled,
    InputBuscaDemanda
} from "./index.styles";

type FiltroBuscaDemandaProps = {
    onFiltrarDemandas: (sentenca: string) => void;
};

const FiltroBuscaDemanda: FC<FiltroBuscaDemandaProps> = ({
    onFiltrarDemandas
}) => {
    const [busca, setBusca] = useState("");

    const onChangeFiltro = (value: string) => {
        setBusca(value);
        onFiltrarDemandas(value);
    };

    return (
        <FiltroBuscaDemandaStyled>
            <InputBuscaDemanda
                testID="input-buscar-demandas"
                placeholder="Buscar demandas..."
                value={busca}
                onChangeText={onChangeFiltro}
                onClearIconPress={() => onChangeFiltro("")}
            />
            <BotaoFiltroDemanda mode="contained" icon="filter">
                Filtros
            </BotaoFiltroDemanda>
        </FiltroBuscaDemandaStyled>
    );
};

export { FiltroBuscaDemanda };
