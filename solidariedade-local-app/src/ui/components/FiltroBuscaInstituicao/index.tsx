import { FC, useState } from "react";

import {
    FiltroBuscaInstituicao as FiltroBuscaInstituicaoStyled,
    InputBuscaInstituicao
} from "./index.styles";

type FiltroBuscaInstituicaoProps = {
    onFiltrarInstituicoes: (sentenca: string) => void;
};

const FiltroBuscaInstituicao: FC<FiltroBuscaInstituicaoProps> = ({
    onFiltrarInstituicoes
}) => {
    const [busca, setBusca] = useState("");

    const onChangeFiltro = (value: string) => {
        setBusca(value);
        onFiltrarInstituicoes(value);
    };

    return (
        <FiltroBuscaInstituicaoStyled>
            <InputBuscaInstituicao
                testID="input-buscar-instituicoes"
                placeholder="Buscar instituições..."
                value={busca}
                onChangeText={onChangeFiltro}
                onClearIconPress={() => onChangeFiltro("")}
            />
        </FiltroBuscaInstituicaoStyled>
    );
};

export { FiltroBuscaInstituicao };
