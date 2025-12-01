import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@screens/auth/LoginScreen';
import { RegisterScreen } from '@screens/auth/RegisterScreen';
import { RegisterTypeScreen } from '@screens/auth/RegisterTypeScreen';
import { ForgotPasswordScreen } from '@screens/auth/ForgotPasswordScreen';

const Stack = createStackNavigator();

export function AuthNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Login"
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="RegisterType" component={RegisterTypeScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </Stack.Navigator>
    );
}
