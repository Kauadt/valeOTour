import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from '../screens/Login';
import AuthRoutes from './tab.routes';
import { Chat } from '../screens/Chat';
import Register from '../screens/Register';
import Conversations from '../screens/Conversations';
import Guias from '../screens/Guias';
import ProfileGuia from '../screens/ProfileGuia';
import ShowMorePlaces from '../screens/ShowMorePlaces';
import RegisterUserImage from '../screens/RegisterUserImage';
import GuiaBecome from '../screens/GuiaBecome';
import Eixos from '../screens/Eixos';
import UpdateProfile from '../screens/UpdateProfile';
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { Scheduling } from '../screens/Scheduling';
import SplashScreen from '../screens/SplashScreen';
import Welcome from '../screens/Welcome';

const pubnub = new PubNub({
    subscribeKey: "sub-c-e9d14b26-6635-4487-9aa1-8ef837b97fed",
    publishKey: "pub-c-8748cedb-8e92-4f1a-a523-a40b2488517c",
    uuid: "0"
});

const Stack = createNativeStackNavigator();

function StackNavigator() {
    return (
        <PubNubProvider client={pubnub}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={AuthRoutes} />
                <Stack.Screen name="Chat" component={Chat} />
                <Stack.Screen name="Eixos" component={Eixos} />
                <Stack.Screen name="userRegister" component={Register} />
                <Stack.Screen name="Conversation" component={Conversations} />
                <Stack.Screen name="Guias" component={Guias} />
                <Stack.Screen name="ProfileGuia" component={ProfileGuia} />
                <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
                <Stack.Screen name="ShowMorePlaces" component={ShowMorePlaces} />
                <Stack.Screen name="RegisterUserImage" component={RegisterUserImage} />
                <Stack.Screen name="GuiaBecome" component={GuiaBecome} />
                <Stack.Screen name="Scheduling" component={Scheduling} />
            </Stack.Navigator>
        </PubNubProvider>
    )
}

function AppRoutes() {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )
}
export default AppRoutes;