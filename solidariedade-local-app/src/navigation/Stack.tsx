import {
    createNativeStackNavigator,
    createNativeStackScreen
} from "@react-navigation/native-stack";

import { DemandasScreen } from "@/screens/Demandas";
import { DetalhesInstituicaoScreen } from "@/screens/DetalhesInstituicao";
import { InstituicoesScreen } from "@/screens/Instituicoes";
import { RegistroDoacaoScreen } from "@/screens/RegistroDoacao";

type DemandasStackParams = {
    Demandas: undefined;
    RegistrarDoacao: {
        idDemanda: string;
    }
};

const DemandasStack = createNativeStackNavigator<DemandasStackParams>({
    initialRouteName: "Demandas",
    screens: {
        Demandas: createNativeStackScreen({
            screen: DemandasScreen,
            options: {
                headerShown: false,
                animation: "fade"
            }
        }),
        RegistrarDoacao: createNativeStackScreen({
            screen: RegistroDoacaoScreen,
            options: {
                headerTitle: "Nova Doação",
                animation: "fade",
                headerTitleAlign: "center"
            }
        }),
    }
});

type InstituicoesStackParams = {
    Instituicoes: undefined;
    DetalhesInstituicao: {
        idInstituicao: string;
    };
};

const InstituicoesStack = createNativeStackNavigator<InstituicoesStackParams>({
    initialRouteName: "Instituicoes",
    screens: {
        Instituicoes: createNativeStackScreen({
            screen: InstituicoesScreen,
            options: {
                headerShown: false,
                animation: "fade"
            }
        }),
        DetalhesInstituicao: createNativeStackScreen({
            screen: DetalhesInstituicaoScreen,
            options: {
                headerShown: false,
                animation: "fade"
            }
        }),
    }
});

export {
    DemandasStack,
    DemandasStackParams,
    InstituicoesStack,
    InstituicoesStackParams
};
