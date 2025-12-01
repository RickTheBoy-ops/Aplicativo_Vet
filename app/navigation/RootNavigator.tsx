import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '@hooks/useAuth';
import { AuthNavigator } from './AuthNavigator';
import { OwnerNavigator } from './OwnerNavigator';
import { VetNavigator } from './VetNavigator';
import { Loading } from '@components/common/Loading';

const Stack = createStackNavigator();

interface RootNavigatorProps {
    onReady?: () => void;
}

export function RootNavigator({ onReady }: RootNavigatorProps) {
    const { isAuthenticated, isLoading, user } = useAuth();

    if (isLoading) {
        return <Loading message="Carregando..." />;
    }

    return (
        <NavigationContainer onReady={onReady}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuthenticated ? (
                    <Stack.Screen name="Auth" component={AuthNavigator} />
                ) : user?.userType === 'owner' ? (
                    <Stack.Screen name="Owner" component={OwnerNavigator} />
                ) : (
                    <Stack.Screen name="Vet" component={VetNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
