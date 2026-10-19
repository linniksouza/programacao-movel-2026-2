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
};

const ListaInstituicoes: FC<ListaInstituicoesProps> = ({
    instituicoes
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<InstituicoesStackParams>>();

    const renderInstituicao = ({ item }: { item: Instituicao }) => {
        const onPress = () => {
            navigation.navigate(
                "DetalhesInstituicao",
                { idInstituicao: item.id }
            );
        };

        return <CardInstituicao instituicao={item} onPress={onPress} />;
    };
    const renderSeparatorInstituicao = () => <Divider bold />;
    const keyExtractorInstituicao = (item: Instituicao) => item.id;

    return (
        <ListaInstituicoesStyled>
            <FlatList
                testID="lista-instituicoes"
                data={instituicoes}
                renderItem={renderInstituicao}
                keyExtractor={keyExtractorInstituicao}
                ItemSeparatorComponent={renderSeparatorInstituicao}
                scrollEnabled
            />
        </ListaInstituicoesStyled>
    );
};

export { ListaInstituicoes };
