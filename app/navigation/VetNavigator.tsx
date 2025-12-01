import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@styles/theme';

// Import screens
import { DashboardScreen } from '@screens/vet/DashboardScreen';
import { AppointmentsScreen } from '@screens/vet/AppointmentsScreen';
import { AvailabilityScreen } from '@screens/vet/AvailabilityScreen';
import { ProfileScreen } from '@screens/vet/ProfileScreen';
import { SubscriptionScreen } from '@screens/vet/SubscriptionScreen';
import { AnalyticsScreen } from '@screens/vet/AnalyticsScreen';
import { CheckoutScreen } from '@screens/vet/CheckoutScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DashboardStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DashboardMain" component={DashboardScreen} />
            <Stack.Screen name="Subscription" component={SubscriptionScreen} />
            <Stack.Screen name="Analytics" component={AnalyticsScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
        </Stack.Navigator>
    );
}

function AppointmentsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AppointmentsMain" component={AppointmentsScreen} />
        </Stack.Navigator>
    );
}

function AvailabilityStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AvailabilityMain" component={AvailabilityScreen} />
        </Stack.Navigator>
    );
}

function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileMain" component={ProfileScreen} />
        </Stack.Navigator>
    );
}

export function VetNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'grid' : 'grid-outline';
                    } else if (route.name === 'Appointments') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    } else if (route.name === 'Availability') {
                        iconName = focused ? 'time' : 'time-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textSecondary,
            })}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardStack}
                options={{ tabBarLabel: 'Dashboard' }}
            />
            <Tab.Screen
                name="Appointments"
                component={AppointmentsStack}
                options={{ tabBarLabel: 'Agendamentos' }}
            />
            <Tab.Screen
                name="Availability"
                component={AvailabilityStack}
                options={{ tabBarLabel: 'Disponibilidade' }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{ tabBarLabel: 'Perfil' }}
            />
        </Tab.Navigator>
    );
}
