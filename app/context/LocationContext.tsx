import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Location } from '@types/common';
import { locationService } from '@services/geolocation/locationService';
import { logger } from '@utils/logger';
import { MAP_CONFIG } from '@utils/constants';

interface LocationContextData {
    location: Location | null;
    isLoading: boolean;
    hasPermission: boolean;
    error: string | null;
    requestPermission: () => Promise<boolean>;
    getCurrentLocation: () => Promise<void>;
    calculateDistance: (lat: number, lon: number) => number;
}

const LocationContext = createContext<LocationContextData>({} as LocationContextData);

interface LocationProviderProps {
    children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
    const [location, setLocation] = useState<Location | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        checkPermission();
    }, []);

    const checkPermission = async () => {
        const permission = await locationService.hasPermissions();
        setHasPermission(permission);

        if (permission) {
            getCurrentLocation();
        }
    };

    const requestPermission = async (): Promise<boolean> => {
        try {
            const granted = await locationService.requestPermissions();
            setHasPermission(granted);

            if (granted) {
                await getCurrentLocation();
            } else {
                setError('Permissão de localização negada');
            }

            return granted;
        } catch (err) {
            logger.error('Error requesting location permission:', err);
            setError('Erro ao solicitar permissão de localização');
            return false;
        }
    };

    const getCurrentLocation = async (): Promise<void> => {
        try {
            setIsLoading(true);
            setError(null);

            const currentLocation = await locationService.getCurrentLocation();

            if (currentLocation) {
                setLocation(currentLocation);
            } else {
                setError('Não foi possível obter a localização');
                // Set default location (São Paulo)
                setLocation({
                    latitude: MAP_CONFIG.DEFAULT_LATITUDE,
                    longitude: MAP_CONFIG.DEFAULT_LONGITUDE,
                });
            }
        } catch (err) {
            logger.error('Error getting current location:', err);
            setError('Erro ao obter localização');
            // Set default location
            setLocation({
                latitude: MAP_CONFIG.DEFAULT_LATITUDE,
                longitude: MAP_CONFIG.DEFAULT_LONGITUDE,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const calculateDistance = (lat: number, lon: number): number => {
        if (!location) return 0;

        return locationService.calculateDistance(
            location.latitude,
            location.longitude,
            lat,
            lon,
        );
    };

    const value: LocationContextData = {
        location,
        isLoading,
        hasPermission,
        error,
        requestPermission,
        getCurrentLocation,
        calculateDistance,
    };

    return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useLocationContext() {
    const context = useContext(LocationContext);

    if (!context) {
        throw new Error('useLocationContext must be used within a LocationProvider');
    }

    return context;
}
