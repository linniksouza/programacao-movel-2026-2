import { FC, useState } from "react";

import { buscarInstituicoes } from "@/data/api/instituicoes";
import { Instituicao } from "@/data/models/instituicao.model";
import { ScreenContainer } from "@/screens/index.styles";
import { FiltroBuscaInstituicao } from "@/ui/components/FiltroBuscaInstituicao";
import { ListaInstituicoes } from "@/ui/components/ListaInstituicoes";
import {
    CabecalhoInstituicoes,
    ContainerInstituicoes,
    TituloCabecalhoInstituicoes
} from "./index.styles";

const InstituicoesScreen: FC = () => {
    const instituicoes = buscarInstituicoes();
    const [sentencaBusca, setSentencaBusca] = useState("");

    const filtrarInstituicoes = (instituicao: Instituicao): boolean => {
        const termo = sentencaBusca.trim().toLowerCase();

        if (!termo)
            return true;

        return (
            instituicao.nome.toLowerCase().includes(termo) ||
            instituicao.localizacao.toLowerCase().includes(termo)
        );
    };
    const instituicoesFiltradas = instituicoes.filter(filtrarInstituicoes);

    return (
        <ScreenContainer>
            <CabecalhoInstituicoes>
                <TituloCabecalhoInstituicoes variant="titleLarge">
                    Instituições
                </TituloCabecalhoInstituicoes>
            </CabecalhoInstituicoes>

            <ContainerInstituicoes elevation={2}>
                {/* Filtro de busca */}
                <FiltroBuscaInstituicao
                    onFiltrarInstituicoes={setSentencaBusca}
                />

                {/* Lista de instituicoes */}
                <ListaInstituicoes
                    instituicoes={instituicoesFiltradas}
                />
            </ContainerInstituicoes>
        </ScreenContainer>
    );
};

export { InstituicoesScreen };
