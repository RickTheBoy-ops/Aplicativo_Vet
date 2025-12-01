import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@types/user';
import { authService } from '@services/api/authService';
import { storageService } from '@services/storage/storageService';
import { logger } from '@utils/logger';

interface AuthContextData {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check if user is already authenticated on mount
    useEffect(() => {
        loadStoredAuth();
    }, []);

    const loadStoredAuth = async () => {
        try {
            const isAuth = await storageService.isAuthenticated();

            if (isAuth) {
                const response = await authService.getCurrentUser();

                if (response.success && response.data) {
                    setUser(response.data);
                } else {
                    await storageService.clearTokens();
                }
            }
        } catch (error) {
            logger.error('Error loading stored auth:', error);
            await storageService.clearTokens();
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const response = await authService.login({ email, password });

            if (!response.success || !response.data) {
                throw new Error(response.error?.message || 'Falha no login');
            }

            const { token, refreshToken, user: userData } = response.data;

            // Store tokens and user info
            await storageService.setToken(token);
            await storageService.setRefreshToken(refreshToken);
            await storageService.setUserId(userData.id);
            await storageService.setUserType(userData.userType);

            setUser(userData);
        } catch (error) {
            logger.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: any) => {
        try {
            setIsLoading(true);
            const response = await authService.register(data);

            if (!response.success || !response.data) {
                throw new Error(response.error?.message || 'Falha no cadastro');
            }

            const { token, refreshToken, user: userData } = response.data;

            // Store tokens and user info
            await storageService.setToken(token);
            await storageService.setRefreshToken(refreshToken);
            await storageService.setUserId(userData.id);
            await storageService.setUserType(userData.userType);

            setUser(userData);
        } catch (error) {
            logger.error('Register error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            await authService.logout();
            await storageService.clearTokens();
            setUser(null);
        } catch (error) {
            logger.error('Logout error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
    };

    const value: AuthContextData = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }

    return context;
}
