import {
    createNativeStackNavigator,
    createNativeStackScreen
} from "@react-navigation/native-stack";

import { DemandasScreen } from "@/screens/Demandas";
import { RegistroDoacaoScreen } from "@/screens/RegistroDoacao";
import { InstituicoesScreen } from "@/screens/Instituicoes";
import { DetalhesInstituicaoScreen } from "@/screens/DetalhesInstituicao";

type DemandasStackParams = {
    Demandas: undefined;
    RegistrarDoacao: {
        idDemanda: string;
    }
};

const DemandasStack = createNativeStackNavigator<DemandasStackParams>({
    screens: {
        Demandas: createNativeStackScreen({
            screen: DemandasScreen,
            options: {
                headerShown: false
            }
        }),
        RegistrarDoacao: createNativeStackScreen({
            screen: RegistroDoacaoScreen,
            options: {
                headerTitle: "Registrar Doação",
                animation: "default"
            }
        })
    }
});

type InstituicoesStackParams = {
    Instituicoes: undefined;
    DetalhesInstituicao: {
        idInstituicao: string;
    };
};

const InstituicoesStack = createNativeStackNavigator<InstituicoesStackParams>({
    screens: {
        Instituicoes: createNativeStackScreen({
            screen: InstituicoesScreen,
            options: {
                headerShown: false,
                animation: "default"
            }
        }),
        DetalhesInstituicao: createNativeStackScreen({
            screen: DetalhesInstituicaoScreen,
            options: {
                headerShown: false,
                animation: "default"
            }
        })
    }
});

export {
    DemandasStack,
    DemandasStackParams,
    InstituicoesStack,
    InstituicoesStackParams
};
