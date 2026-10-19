import {
    MaterialDesignIcons
} from "@react-native-vector-icons/material-design-icons";
import {
    createBottomTabNavigator,
    createBottomTabScreen
} from "@react-navigation/bottom-tabs";
import { createStaticNavigation } from "@react-navigation/native";

import { HistoricoDoacoesScreen } from "@/screens/HistoricoDoacoes";
import { PerfilScreen } from "@/screens/Perfil";
import {
    DemandasStack,
    InstituicoesStack
} from "./Stack";

const Tabs = createBottomTabNavigator({
    initialRouteName: "DemandasTab",
    screenOptions: {
        headerShown: false
    },
    screens: {
        DemandasTab: createBottomTabScreen({
            screen: DemandasStack,
            options: {
                tabBarIcon: ({ size, color }) => (
                    <MaterialDesignIcons name="home-outline" size={size} color={color} />
                ),
                tabBarLabel: "Início",
                animation: "shift"
            }
        }),
        InstituicoesTab: createBottomTabScreen({
            screen: InstituicoesStack,
            options: {
                animation: "shift",
                tabBarLabel: "Instituições",
                tabBarIcon: ({ size, color }) => (
                    <MaterialDesignIcons name="bank-outline" size={size} color={color} />
                )
            }
        }),
        HistoricoDoacoesTab: createBottomTabScreen({
            screen: HistoricoDoacoesScreen,
            options: {
                animation: "shift",
                tabBarLabel: "Doações",
                tabBarIcon: ({ size, color }) => (
                    <MaterialDesignIcons name="mail" size={size} color={color} />
                )
            }
        }),
        PerfilTab: createBottomTabScreen({
            screen: PerfilScreen,
            options: {
                animation: "shift",
                tabBarLabel: "Perfil",
                tabBarIcon: ({ size, color }) => (
                    <MaterialDesignIcons name="account-outline" size={size} color={color} />
                )
            }
        })
    }
});

const MainTabs = createStaticNavigation(Tabs);

export { MainTabs, Tabs };
