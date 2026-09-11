import { createBottomTabNavigator, createBottomTabScreen } from "@react-navigation/bottom-tabs";
import { createStaticNavigation } from "@react-navigation/native";

import { HistoricoDoacoesScreen } from "@/screens/HistoricoDoacoes";
import { InstituicoesScreen } from "@/screens/Instituicoes";
import { Stack } from "./Stack";
import { PerfilScreen } from "@/screens/Perfil";
import { MaterialDesignIcons} from "@react-native-vector-icons/material-design-icons";

const Tabs = createBottomTabNavigator({
    screenOptions: {
        headerShown: false
    },
    screens: {
        Inicio: createBottomTabScreen({
            screen: Stack,
            options: {
                tabBarIcon: ({ size, color }) => (
                    <MaterialDesignIcons name="home" size={size} color={color} />
                ),
                tabBarLabel: "Início",
                animation: "shift"
            }
        }),
        Instituicoes: createBottomTabScreen({
            screen: InstituicoesScreen,
            options: {
                tabBarIcon: ({ size, color }) => (
                    <MaterialDesignIcons name="bank" size={size} color={color} />
                ),
                tabBarLabel: "Instituições",
                animation: "shift"
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

