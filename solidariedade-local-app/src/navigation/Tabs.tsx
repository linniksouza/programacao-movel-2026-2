import { createBottomTabNavigator, createBottomTabScreen } from "@react-navigation/bottom-tabs";
import { createStaticNavigation } from "@react-navigation/native";

import { HistoricoDoacoesScreen } from "@/screens/HistoricoDoacoes";
import { InstituicoesScreen } from "@/screens/Instituicoes";
import { DemandasStack, InstituicoesStack } from "./Stack";
import { PerfilScreen } from "@/screens/Perfil";
import { MaterialDesignIcons} from "@react-native-vector-icons/material-design-icons";

const Tabs = createBottomTabNavigator({
    screenOptions: {
        headerShown: false
    },
    screens: {
        DemandasStack: createBottomTabScreen({
            screen: DemandasStack,
            options: {
                tabBarIcon: ({ size, color }) => (
                    <MaterialDesignIcons name="home" size={size} color={color} />
                ),
                tabBarLabel: "Início",
                animation: "shift"
            }
        }),
        InstituicoesStack: createBottomTabScreen({
            screen: InstituicoesStack,
            options: {
                tabBarIcon: ({ size, color }) => (
                    <MaterialDesignIcons name="bank" size={size} color={color} />
                ),
                tabBarLabel: "Instituições",
                animation: "shift",
                tabBarVisibilityAnimationConfig: {
                    show: {
                        animation: "spring"
                    }
                }
            }
        }),
        HistoricoDoacoes: createBottomTabScreen({
            screen: HistoricoDoacoesScreen,
            options: {
                tabBarIcon: ({ size, color }) => (
                    <MaterialDesignIcons name="mail" size={size} color={color} />
                ),
                tabBarLabel: "Doações",
                animation: "shift"
            }
        }),
        Perfil: createBottomTabScreen({
            screen: PerfilScreen,
            options: {
                tabBarIcon: ({ size, color }) => (
                    <MaterialDesignIcons name="face-man-outline" size={size} color={color} />
                ),
                tabBarLabel: "Perfil",
                animation: "shift"
            }
        })
    }
});

const MainTabs = createStaticNavigation(Tabs);

export { MainTabs };

