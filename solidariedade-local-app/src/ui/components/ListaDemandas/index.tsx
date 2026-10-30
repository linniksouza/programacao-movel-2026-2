import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC } from "react";
import { FlatList } from "react-native";

import { Demanda } from "@/data/models/demanda.model";
import { DemandasStackParams } from "@/navigation/Stack";
import { CardDemanda } from "@/ui/components/CardDemanda";
import {
    ListaDemandas as ListaDemandasStyled,
    SecaoListaDemandas
} from "./index.styles";

type ListaDemandasProps = {
    demandas: Demanda[];
    refreshing: boolean;
    onRefresh: () => void;
};

const ListaDemandas: FC<ListaDemandasProps> = ({
    demandas,
    refreshing,
    onRefresh
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<DemandasStackParams>>();

    const renderDemanda = ({ item }: { item: Demanda }) => {
        const onPress = () => {
            navigation.navigate(
                "RegistrarDoacao",
                { demanda: item }
            );
        };

        return <CardDemanda demanda={item} onPress={onPress} />;
    };
    const keyExtractorDemanda = (item: Demanda) => item.id;

    return (
        <ListaDemandasStyled>
            <SecaoListaDemandas variant="titleLarge">
                Demandas
            </SecaoListaDemandas>

            <FlatList
                testID="lista-demandas"
                data={demandas}
                renderItem={renderDemanda}
                keyExtractor={keyExtractorDemanda}
                refreshing={refreshing}
                onRefresh={onRefresh}
                scrollEnabled
            />
        </ListaDemandasStyled>
    );
};

export { ListaDemandas };
