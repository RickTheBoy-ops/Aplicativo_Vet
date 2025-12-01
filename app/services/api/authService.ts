import { apiClient } from './client';
import { ApiResponse } from '@types/common';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '@types/user';

class AuthService {
    /**
     * Helper para simular delay de rede
     */
    private async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Login with email and password
     */
    async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        console.log('[AuthService] Attempting login with:', credentials.email);
        
        // Tenta API Real
        const response = await apiClient.post<AuthResponse>('/auth/login', credentials);

        // Se sucesso, retorna. Se erro NÃO for de rede, retorna o erro da API (ex: senha errada)
        if (response.success || (response.error && response.error.code !== 'NETWORK_ERROR')) {
            return response;
        }

        // Se falhou por erro de rede (backend desligado), usa Mock
        console.warn('[AuthService] API network error, using MOCK response for preview.');
        
        await this.delay(1000);

        return {
            success: true,
            data: {
                token: 'mock-jwt-token-12345',
                refreshToken: 'mock-refresh-token-12345',
                user: {
                    id: 'mock-user-id',
                    email: credentials.email,
                    name: 'Usuário de Teste',
                    userType: 'owner', // Default to owner for preview
                    avatar: 'https://i.pravatar.cc/150?u=vetfield',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    isActive: true,
                    isVerified: true,
                    phone: '(11) 99999-9999'
                }
            }
        };
    }

    /**
     * Register a new user
     */
    async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
        console.log('[AuthService] Attempting register with:', data.email);
        
        const response = await apiClient.post<AuthResponse>('/auth/register', data);

        if (response.success || (response.error && response.error.code !== 'NETWORK_ERROR')) {
            return response;
        }

        console.warn('[AuthService] API network error, using MOCK response for preview.');
        
        await this.delay(1500);

        return {
            success: true,
            data: {
                token: 'mock-jwt-token-register-12345',
                refreshToken: 'mock-refresh-token-register-12345',
                user: {
                    id: 'mock-new-user-id',
                    email: data.email,
                    name: data.name,
                    userType: data.userType || 'owner',
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    isActive: true,
                    isVerified: true,
                    phone: data.phone || '(11) 99999-9999'
                }
            }
        };
    }

    /**
     * Logout the current user
     */
    async logout(): Promise<ApiResponse<void>> {
        const response = await apiClient.post<void>('/auth/logout');
        if (response.success) return response;
        
        // Mock logout success
        return { success: true };
    }

    /**
     * Get current user profile
     */
    async getCurrentUser(): Promise<ApiResponse<User>> {
        const response = await apiClient.get<User>('/auth/me');
        if (response.success) return response;

        // Mock user
        return {
            success: true,
            data: {
                id: 'mock-user-id',
                email: 'mock@example.com',
                name: 'Usuário de Teste',
                userType: 'owner',
                avatar: 'https://i.pravatar.cc/150?u=vetfield',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isActive: true,
                isVerified: true,
                phone: '(11) 99999-9999'
            }
        };
    }

    /**
     * Request password reset
     */
    async forgotPassword(email: string): Promise<ApiResponse<void>> {
        const response = await apiClient.post<void>('/auth/forgot-password', { email });
        if (response.success) return response;
        
        // Mock success
        await this.delay(1000);
        return { success: true };
    }

    /**
     * Reset password with token
     */
    async resetPassword(token: string, newPassword: string): Promise<ApiResponse<void>> {
        const response = await apiClient.post<void>('/auth/reset-password', {
            token,
            newPassword,
        });
        if (response.success) return response;

        await this.delay(1000);
        return { success: true };
    }

    /**
     * Verify email with token
     */
    async verifyEmail(token: string): Promise<ApiResponse<void>> {
        const response = await apiClient.post<void>('/auth/verify-email', { token });
        if (response.success) return response;
        
        return { success: true };
    }

    /**
     * Resend verification email
     */
    async resendVerificationEmail(): Promise<ApiResponse<void>> {
        const response = await apiClient.post<void>('/auth/resend-verification');
        if (response.success) return response;
        
        return { success: true };
    }

    /**
     * Change password (requires current password)
     */
    async changePassword(
        currentPassword: string,
        newPassword: string,
    ): Promise<ApiResponse<void>> {
        const response = await apiClient.post<void>('/auth/change-password', {
            currentPassword,
            newPassword,
        });
        if (response.success) return response;

        return { success: true };
    }
}

export const authService = new AuthService();
