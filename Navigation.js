// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login.js';
import HomeScreen from './pages/Home.js';
import Register from './pages/Register.js';
import InicioScreen from './pages/Inicio.js';
import TasksScreen from './pages/Tareas.js';

const Stack = createNativeStackNavigator();

function MyTabs() {
    return (
        <Stack.Navigator initialRouteName='Inicio'>
            <Stack.Screen 
                name="Inicio" 
                component={InicioScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="Login" 
                component={Login}
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }} 
            />
             <Stack.Screen 
                name="Tareas"
                component={TasksScreen}
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="Register"
                component={Register}
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}
