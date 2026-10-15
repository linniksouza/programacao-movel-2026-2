import { FlatList, View } from "react-native";
import { Divider, Surface, Text } from "react-native-paper";

import { ItemDoacaoDemanda } from "@/data/models/demanda.model";
import { ItemDoacao } from "@/ui/components/ItemDoacao";

type ListaItensDoacaoProps = {
    itensDoacao: ItemDoacaoDemanda[];
    quantidades: Record<string, number>;
    onChangeQuantidade: (key: string, value: number) => void;
};

const ListaItensDoacao = ({
    itensDoacao,
    quantidades,
    onChangeQuantidade
}: ListaItensDoacaoProps) => {
    const keyExtractorItemDoacao = (item: ItemDoacaoDemanda) => `${item.nome}-${item.unidadeMedida}`;
    const renderItemDoacao = ({ item }: { item: ItemDoacaoDemanda }) => {
        const key = keyExtractorItemDoacao(item);
        const quantidade = quantidades[key] || 0;

        return (
            <>
                <ItemDoacao
                    item={item}
                    quantidade={quantidade}
                    setQuantidade={(qtd) => onChangeQuantidade(key, qtd)}
                />
                <Divider />
            </>
        );
    };

    return (
        <View style={{ marginTop: 20 }}>
            <Text variant="titleLarge">
                Itens doados
            </Text>

            <Surface
                style={{
                    marginTop: 10,
                    borderRadius: 15
                }}
                elevation={2}
            >
                <FlatList
                    data={itensDoacao}
                    renderItem={renderItemDoacao}
                    keyExtractor={keyExtractorItemDoacao}
                />
            </Surface>
        </View>
    );
};

export { ListaItensDoacao };
