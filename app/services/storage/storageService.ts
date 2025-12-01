import * as SecureStore from 'expo-secure-store';

const KEYS = {
    TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_ID: 'user_id',
    USER_TYPE: 'user_type',
};

class StorageService {
    /**
     * Save authentication token
     */
    async setToken(token: string): Promise<void> {
        try {
            await SecureStore.setItemAsync(KEYS.TOKEN, token);
        } catch (error) {
            console.error('Error saving token:', error);
            throw new Error('Failed to save authentication token');
        }
    }

    /**
     * Get authentication token
     */
    async getToken(): Promise<string | null> {
        try {
            return await SecureStore.getItemAsync(KEYS.TOKEN);
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    }

    /**
     * Save refresh token
     */
    async setRefreshToken(token: string): Promise<void> {
        try {
            await SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, token);
        } catch (error) {
            console.error('Error saving refresh token:', error);
            throw new Error('Failed to save refresh token');
        }
    }

    /**
     * Get refresh token
     */
    async getRefreshToken(): Promise<string | null> {
        try {
            return await SecureStore.getItemAsync(KEYS.REFRESH_TOKEN);
        } catch (error) {
            console.error('Error getting refresh token:', error);
            return null;
        }
    }

    /**
     * Save user ID
     */
    async setUserId(userId: string): Promise<void> {
        try {
            await SecureStore.setItemAsync(KEYS.USER_ID, userId);
        } catch (error) {
            console.error('Error saving user ID:', error);
            throw new Error('Failed to save user ID');
        }
    }

    /**
     * Get user ID
     */
    async getUserId(): Promise<string | null> {
        try {
            return await SecureStore.getItemAsync(KEYS.USER_ID);
        } catch (error) {
            console.error('Error getting user ID:', error);
            return null;
        }
    }

    /**
     * Save user type
     */
    async setUserType(userType: 'owner' | 'vet'): Promise<void> {
        try {
            await SecureStore.setItemAsync(KEYS.USER_TYPE, userType);
        } catch (error) {
            console.error('Error saving user type:', error);
            throw new Error('Failed to save user type');
        }
    }

    /**
     * Get user type
     */
    async getUserType(): Promise<'owner' | 'vet' | null> {
        try {
            const userType = await SecureStore.getItemAsync(KEYS.USER_TYPE);
            return userType as 'owner' | 'vet' | null;
        } catch (error) {
            console.error('Error getting user type:', error);
            return null;
        }
    }

    /**
     * Clear all authentication data
     */
    async clearTokens(): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(KEYS.TOKEN);
            await SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN);
            await SecureStore.deleteItemAsync(KEYS.USER_ID);
            await SecureStore.deleteItemAsync(KEYS.USER_TYPE);
        } catch (error) {
            console.error('Error clearing tokens:', error);
            throw new Error('Failed to clear authentication data');
        }
    }

    /**
     * Check if user is authenticated
     */
    async isAuthenticated(): Promise<boolean> {
        const token = await this.getToken();
        return !!token;
    }
}

export const storageService = new StorageService();
