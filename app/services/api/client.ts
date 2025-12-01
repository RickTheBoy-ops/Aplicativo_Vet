import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiError } from '@types/common';
import { storageService } from '../storage/storageService';
import { API_CONFIG } from '@utils/apiConfig';

console.log(`[ApiClient] Configurado com Base URL: ${API_CONFIG.BASE_URL}`);

class ApiClient {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: API_CONFIG.BASE_URL,
            timeout: API_CONFIG.TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        // Request interceptor - Add auth token
        this.instance.interceptors.request.use(
            async (config) => {
                const token = await storageService.getToken();
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        // Response interceptor - Handle errors and token refresh
        this.instance.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

                // If 401 and not already retried, try to refresh token
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const refreshToken = await storageService.getRefreshToken();
                        if (!refreshToken) {
                            throw new Error('No refresh token available');
                        }

                        // Call refresh endpoint
                        // Note: We use the instance base URL, but we need to be careful about infinite loops
                        // Creating a clean axios call for refresh to avoid interceptors loop
                        const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/refresh`, {
                            refreshToken,
                        });

                        const { token, refreshToken: newRefreshToken } = response.data.data;

                        // Save new tokens
                        await storageService.setToken(token);
                        await storageService.setRefreshToken(newRefreshToken);

                        // Retry original request with new token
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        }
                        return this.instance(originalRequest);
                    } catch (refreshError) {
                        // Refresh failed, clear tokens and redirect to login
                        await storageService.clearTokens();
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(this.handleError(error));
            },
        );
    }

    private handleError(error: AxiosError): ApiError {
        const url = error.config?.url || 'unknown';
        const baseURL = error.config?.baseURL || '';
        const fullUrl = baseURL + url;

        if (error.response) {
            // Server responded with error
            const data = error.response.data as { error?: ApiError; message?: string };
            console.error(`[ApiClient] Erro do servidor (${error.response.status}) em ${fullUrl}:`, data);
            
            return {
                code: data.error?.code || `HTTP_${error.response.status}`,
                message: data.error?.message || data.message || 'Erro desconhecido',
                details: data.error?.details,
            };
        }

        if (error.request) {
            // Request made but no response
            console.error(`[ApiClient] Erro de rede (sem resposta) ao tentar acessar: ${fullUrl}`);
            console.error('[ApiClient] Detalhes do erro:', error.message);
            
            return {
                code: 'NETWORK_ERROR',
                message: `Erro de rede ao conectar com o servidor. Verifique se o backend está rodando em ${baseURL}`,
            };
        }

        // Something else happened
        console.error('[ApiClient] Erro desconhecido na requisição:', error.message);
        return {
            code: 'UNKNOWN_ERROR',
            message: error.message || 'Erro desconhecido',
        };
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<ApiResponse<T>> = await this.instance.get(url, config);
            return response.data;
        } catch (error) {
            return {
                success: false,
                error: error as ApiError,
            };
        }
    }

    public async post<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<ApiResponse<T>> = await this.instance.post(url, data, config);
            return response.data;
        } catch (error) {
            return {
                success: false,
                error: error as ApiError,
            };
        }
    }

    public async put<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<ApiResponse<T>> = await this.instance.put(url, data, config);
            return response.data;
        } catch (error) {
            return {
                success: false,
                error: error as ApiError,
            };
        }
    }

    public async patch<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<ApiResponse<T>> = await this.instance.patch(url, data, config);
            return response.data;
        } catch (error) {
            return {
                success: false,
                error: error as ApiError,
            };
        }
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<ApiResponse<T>> = await this.instance.delete(url, config);
            return response.data;
        } catch (error) {
            return {
                success: false,
                error: error as ApiError,
            };
        }
    }
}

export const apiClient = new ApiClient();
