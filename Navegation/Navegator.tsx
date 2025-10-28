import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../Screens/HomeScreen";
import GraficasScreen from "../Screens/GraficasScreen";
import { CreditScreen } from "../Screens/CreditScreen";

const Tab = createBottomTabNavigator();

export function Navegation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Tablas de frecuencias" component={HomeScreen} />
        <Tab.Screen name="Graficas" component={GraficasScreen} />
        <Tab.Screen name="Creditos" component={CreditScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
