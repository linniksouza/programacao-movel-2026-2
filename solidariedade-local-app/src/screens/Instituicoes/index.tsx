import { FC, useEffect, useState } from "react";

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
import { useSnackbar } from "@/ui/hooks/snackbar";

const InstituicoesScreen: FC = () => {
    const { showSnackbar } = useSnackbar();

    const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
    const [buscandoInstituicoes, setBuscandoInstituicoes] = useState(false);
    const [sentencaBusca, setSentencaBusca] = useState("");

    const onBuscarInstituicoes = async () => {
        try{
            const dadosInstituicoes = await buscarInstituicoes();
            setInstituicoes([...dadosInstituicoes]);
        }catch(e: any){
            const erro = e as Error;
            showSnackbar(erro.message, 5000);
        }
    };
    const onRefreshInstituicoes = async () => {
        setBuscandoInstituicoes(true);
        await onBuscarInstituicoes();
        setBuscandoInstituicoes(false);
    };
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

    useEffect(() => {
        onBuscarInstituicoes();
    }, []);

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
                    refreshing={buscandoInstituicoes}
                    onRefresh={onRefreshInstituicoes}
                />
            </ContainerInstituicoes>
        </ScreenContainer>
    );
};

export { InstituicoesScreen };
