import { FC } from "react";
import { FlatList } from "react-native";
import { Divider } from "react-native-paper";

import { ItemDoacaoDemanda } from "@/data/models/demanda.model";
import { ItemDoacao } from "@/ui/components/ItemDoacao";
import {
    ListaItensDoacao as ListaItensDoacaoStyled
} from "./index.styles";

type ListaItensDoacaoProps = {
    itensDoacao: ItemDoacaoDemanda[];
    quantidades: Record<string, number>;
    onChangeQuantidade: (key: string, value: number) => void;
};

const ListaItensDoacao: FC<ListaItensDoacaoProps> = ({
    itensDoacao,
    quantidades,
    onChangeQuantidade
}) => {
    const keyExtractorItemDoacao = (item: ItemDoacaoDemanda) => `${item.nome}-${item.unidade_medida}`;
    const renderItemDoacao = ({ item }: { item: ItemDoacaoDemanda }) => {
        const key = keyExtractorItemDoacao(item);
        const quantidade = quantidades[key] || 0;
        const setQuantidade = (qtd: number) => onChangeQuantidade(key, qtd);

        return (
            <ItemDoacao
                item={item}
                quantidade={quantidade}
                setQuantidade={setQuantidade}
            />
        );
    };
    const renderSeparatorItemDoacao = () => <Divider bold />;

    return (
        <ListaItensDoacaoStyled>
            <FlatList
                data={itensDoacao}
                renderItem={renderItemDoacao}
                keyExtractor={keyExtractorItemDoacao}
                ItemSeparatorComponent={renderSeparatorItemDoacao}
                scrollEnabled
            />
        </ListaItensDoacaoStyled>
    );
};

export { ListaItensDoacao };
