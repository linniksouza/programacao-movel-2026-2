import { FC } from "react";
import { FlatList } from "react-native";

import { Doacao } from "@/data/models/doacao.model";
import { CardDoacaoFeita } from "@/ui/components/CardDoacaoFeita";
import {
    ListaDoacoesFeitas as ListaDoacoesFeitasStyled,
    TextoSemDoacao
} from "./index.styles";

type ListaDoacoesFeitasProps = {
    doacoes: Doacao[];
    refreshing: boolean;
    onRefresh: () => void;
};

const ListaDoacoesFeitas: FC<ListaDoacoesFeitasProps> = ({
    doacoes,
    refreshing,
    onRefresh
}) => {
    const renderSemDoacoes = () => {
        return (
            <TextoSemDoacao variant="headlineMedium">
                Você ainda não fez nenhuma doação!
            </TextoSemDoacao>
        );
    };
    const renderDoacaoFeita = ({ item }: { item: Doacao }) => {
        return <CardDoacaoFeita doacao={item} />;
    };
    const keyExtractorDoacaoFeita = (item: Doacao) => item.id!;

    return (
        <ListaDoacoesFeitasStyled>
            <FlatList
                testID="lista-doacoes-feitas"
                data={doacoes}
                renderItem={renderDoacaoFeita}
                keyExtractor={keyExtractorDoacaoFeita}
                refreshing={refreshing}
                onRefresh={onRefresh}
                ListEmptyComponent={renderSemDoacoes}
            />
        </ListaDoacoesFeitasStyled>
    );
};

export { ListaDoacoesFeitas };
