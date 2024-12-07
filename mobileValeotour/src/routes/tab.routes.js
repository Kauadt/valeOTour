import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

import Home from '../screens/Home'
import User from '../screens/User'
import Conversations from '../screens/Conversations';
import Maps from '../screens/Maps';
import Explore from '../screens/Explore';

const Tab = createBottomTabNavigator();

const AuthRoutes = () => {

    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false, 
    
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                size = 20;
                color = focused ? colors.brighterBlue : colors.mediumGray;
    
                if (route.name === 'Inicio') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Explore') {
                    iconName = focused ? 'search' : 'search-outline';
                } else if (route.name === 'Maps') {
                    iconName = focused ? 'map' : 'map-outline';
                } else if (route.name === 'Conversations') {
                    iconName = focused ? 'chatbubble' : 'chatbubble-outline';
                } else if (route.name === 'User') {
                    iconName = focused ? 'person' : 'person-outline';
                }
    
                let label;
                if (route.name === 'Inicio') {
                    label = 'Início';
                } else if (route.name === 'Explore') {
                    label = 'Explorar';
                } else if (route.name === 'Maps') {
                    label = 'Mapa';
                } else if (route.name === 'Conversations') {
                    label = 'Conversas';
                } else if (route.name === 'User') {
                    label = 'Usuário';
                }
    
                return (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name={iconName} size={size} color={color} />
                        <Text style={{
                            color: focused ? colors.darkBlue : colors.mediumGray,
                            fontSize: 9,
                            marginTop: 2,
                            fontFamily: fonts.medium,
                        }}>
                            {label}
                        </Text>
                    </View>
                );
            },
    
            tabBarStyle: {
                backgroundColor: '#fff',
                height: 52, 
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
                marginBottom: 10,
                marginHorizontal: 24,
                paddingHorizontal: 10,
            },
        })}
    >
        <Tab.Screen name="Inicio" component={Home}></Tab.Screen>
        <Tab.Screen name="Explore" component={Explore}></Tab.Screen>
        <Tab.Screen name="Maps" component={Maps}></Tab.Screen>
        <Tab.Screen name="Conversations" component={Conversations}></Tab.Screen>
        <Tab.Screen name="User" component={User}></Tab.Screen>
    </Tab.Navigator>
    );
}

export default AuthRoutes;