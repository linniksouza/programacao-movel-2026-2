import {
    createNativeStackNavigator,
    createNativeStackScreen
} from "@react-navigation/native-stack";

import { DemandasScreen } from "@/screens/Demandas";
import { RegistroDoacaoScreen } from "@/screens/RegistroDoacao";

type StackParams = {
    Demandas: undefined;
    RegistrarDoacao: {
        idDemanda: string;
    }
};

const Stack = createNativeStackNavigator<StackParams>({
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
                headerTitle: "Registrar Doação"
            }
        })
    }
});

// const DemandasStack = createStaticNavigation(Stack);

export { Stack, StackParams };

