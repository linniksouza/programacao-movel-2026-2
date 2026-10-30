import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC } from "react";
import { FlatList } from "react-native";
import { Divider } from "react-native-paper";

import { Instituicao } from "@/data/models/instituicao.model";
import { InstituicoesStackParams } from "@/navigation/Stack";
import { CardInstituicao } from "@/ui/components/CardInstituicao";
import {
    ListaInstituicoes as ListaInstituicoesStyled
} from "./index.styles";

type ListaInstituicoesProps = {
    instituicoes: Instituicao[];
    refreshing: boolean;
    onRefresh: () => void;
};

const ListaInstituicoes: FC<ListaInstituicoesProps> = ({
    instituicoes,
    refreshing,
    onRefresh
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<InstituicoesStackParams>>();

    const renderInstituicao = ({ item }: { item: Instituicao }) => {
        const onPress = () => {
            navigation.navigate(
                "DetalhesInstituicao",
                { instituicao: item }
            );
        };

        return <CardInstituicao instituicao={item} onPress={onPress} />;
    };
    const renderSeparatorInstituicao = () => <Divider bold />;
    const keyExtractorInstituicao = (item: Instituicao) => item.cnpj;

    return (
        <ListaInstituicoesStyled>
            <FlatList
                testID="lista-instituicoes"
                data={instituicoes}
                renderItem={renderInstituicao}
                keyExtractor={keyExtractorInstituicao}
                ItemSeparatorComponent={renderSeparatorInstituicao}
                refreshing={refreshing}
                onRefresh={onRefresh}
                scrollEnabled
            />
        </ListaInstituicoesStyled>
    );
};

export { ListaInstituicoes };
