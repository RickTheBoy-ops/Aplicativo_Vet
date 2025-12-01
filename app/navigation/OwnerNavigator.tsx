import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@styles/theme';

// Import screens
import { HomeScreen } from '@screens/owner/HomeScreen';
import { SearchVetScreen } from '@screens/owner/SearchVetScreen';
import { VetDetailScreen } from '@screens/owner/VetDetailScreen';
import { BookingScreen } from '@screens/owner/BookingScreen';
import { MyBookingsScreen } from '@screens/owner/MyBookingsScreen';
import { ProfileScreen } from '@screens/owner/ProfileScreen';
import { AnimalManagementScreen } from '@screens/owner/AnimalManagementScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeMain" component={HomeScreen} />
            <Stack.Screen name="VetDetail" component={VetDetailScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
        </Stack.Navigator>
    );
}

function SearchStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SearchMain" component={SearchVetScreen} />
            <Stack.Screen name="VetDetail" component={VetDetailScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
        </Stack.Navigator>
    );
}

function BookingsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BookingsMain" component={MyBookingsScreen} />
        </Stack.Navigator>
    );
}

function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileMain" component={ProfileScreen} />
            <Stack.Screen name="AnimalManagement" component={AnimalManagementScreen} />
        </Stack.Navigator>
    );
}

export function OwnerNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'Bookings') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
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
                name="Home"
                component={HomeStack}
                options={{ tabBarLabel: 'Início' }}
            />
            <Tab.Screen
                name="Search"
                component={SearchStack}
                options={{ tabBarLabel: 'Buscar' }}
            />
            <Tab.Screen
                name="Bookings"
                component={BookingsStack}
                options={{ tabBarLabel: 'Agendamentos' }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{ tabBarLabel: 'Perfil' }}
            />
        </Tab.Navigator>
    );
}
