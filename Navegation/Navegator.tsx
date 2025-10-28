import React from "react";
import { Image, StyleSheet, Platform } from "react-native"; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { DatosProvider } from './../Contexts/DatosContext'; 

import HomeScreen from "../Screens/HomeScreen"; 
import GraficasScreen from "../Screens/GraficasScreen"; 
import CreditScreen from "../Screens/CreditScreen"; 

const HomeIcon = require('../assets/Home.png'); 
const GraficasIcon = require('../assets/Increase Profits.png');
const CreditIcon = require('../assets/Profile.png');

const Tab = createBottomTabNavigator();

export function Navigation() {
  return (
    <DatosProvider> 
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: true,
            headerStyle: {
                backgroundColor: '#FFFFFF',
                borderBottomWidth: 0,
                ...Platform.select({
                    ios: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                    },
                    android: {
                        elevation: 4,
                    },
                }),
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
            
                fontWeight: 'bold',
                fontSize: 30, 
            },
            headerTitleAlign: 'center',
            
            tabBarIcon: ({ focused }) => {
                let iconSource;
                if (route.name === 'Tablas') {
                    iconSource = HomeIcon;
                } else if (route.name === 'Graficas') {
                    iconSource = GraficasIcon;
                } else if (route.name === 'Creditos') {
                    iconSource = CreditIcon;
                }
                return (
                    <Image 
                        source={iconSource} 
                        style={[
                            styles.tabIcon, 
                            { tintColor: focused ? '#FFFFFF' : '#888888' } 
                        ]} 
                    />
                );
            },
            tabBarStyle: {
                backgroundColor: '#000000', 
                borderTopColor: '#333333',
                height: 60, 
                paddingBottom: 5, 
                paddingTop: 5, 
            },
            tabBarLabelStyle: {
                fontSize: 12, 
                fontWeight: '600',
            },
            tabBarActiveTintColor: '#FFFFFF', 
            tabBarInactiveTintColor: '#888888', 
          })}
        >
          <Tab.Screen 
            name="Tablas" 
            component={HomeScreen} 
            options={{ title: 'Tablas de Frecuencia' }}
          />
          <Tab.Screen 
            name="Graficas" 
            component={GraficasScreen} 
            options={{ title: 'Gráfica de Datos' }}
          />
          <Tab.Screen 
            name="Creditos" 
            component={CreditScreen} 
            options={{ title: 'Colaboradores' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </DatosProvider> 
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 24, 
    height: 24, 
    resizeMode: 'contain', 
  },
});