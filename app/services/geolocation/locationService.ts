import * as ExpoLocation from 'expo-location';
import { Location } from '@types/common';

class LocationService {
    /**
     * Request location permissions
     */
    async requestPermissions(): Promise<boolean> {
        try {
            const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
            return status === 'granted';
        } catch (error) {
            console.error('Error requesting location permissions:', error);
            return false;
        }
    }

    /**
     * Check if location permissions are granted
     */
    async hasPermissions(): Promise<boolean> {
        try {
            const { status } = await ExpoLocation.getForegroundPermissionsAsync();
            return status === 'granted';
        } catch (error) {
            console.error('Error checking location permissions:', error);
            return false;
        }
    }

    /**
     * Get current location
     */
    async getCurrentLocation(): Promise<Location | null> {
        try {
            const hasPermission = await this.hasPermissions();
            if (!hasPermission) {
                const granted = await this.requestPermissions();
                if (!granted) {
                    throw new Error('Location permission not granted');
                }
            }

            const location = await ExpoLocation.getCurrentPositionAsync({
                accuracy: ExpoLocation.Accuracy.High,
            });

            return {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                accuracy: location.coords.accuracy || undefined,
                altitude: location.coords.altitude || undefined,
                heading: location.coords.heading || undefined,
                speed: location.coords.speed || undefined,
            };
        } catch (error) {
            console.error('Error getting current location:', error);
            return null;
        }
    }

    /**
     * Calculate distance between two coordinates (in kilometers)
     */
    calculateDistance(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number,
    ): number {
        const R = 6371; // Earth's radius in kilometers
        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRadians(lat1)) *
            Math.cos(this.toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    /**
     * Convert degrees to radians
     */
    private toRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    /**
     * Geocode address to coordinates
     */
    async geocodeAddress(address: string): Promise<Location | null> {
        try {
            const results = await ExpoLocation.geocodeAsync(address);
            if (results.length > 0) {
                const result = results[0];
                return {
                    latitude: result.latitude,
                    longitude: result.longitude,
                };
            }
            return null;
        } catch (error) {
            console.error('Error geocoding address:', error);
            return null;
        }
    }

    /**
     * Reverse geocode coordinates to address
     */
    async reverseGeocode(
        latitude: number,
        longitude: number,
    ): Promise<string | null> {
        try {
            const results = await ExpoLocation.reverseGeocodeAsync({
                latitude,
                longitude,
            });

            if (results.length > 0) {
                const result = results[0];
                return [
                    result.street,
                    result.streetNumber,
                    result.district,
                    result.city,
                    result.region,
                    result.postalCode,
                ]
                    .filter(Boolean)
                    .join(', ');
            }
            return null;
        } catch (error) {
            console.error('Error reverse geocoding:', error);
            return null;
        }
    }
}

export const locationService = new LocationService();
