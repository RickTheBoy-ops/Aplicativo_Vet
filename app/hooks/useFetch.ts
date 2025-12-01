import { useState, useEffect } from 'react';
import { ApiResponse } from '@types/common';
import { logger } from '@utils/logger';

interface UseFetchOptions<T> {
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
    immediate?: boolean;
}

interface UseFetchReturn<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useFetch<T>(
    fetchFn: () => Promise<ApiResponse<T>>,
    options: UseFetchOptions<T> = {},
): UseFetchReturn<T> {
    const { onSuccess, onError, immediate = true } = options;
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetchFn();

            if (response.success && response.data) {
                setData(response.data);
                onSuccess?.(response.data);
            } else {
                const errorMessage = response.error?.message || 'Erro ao carregar dados';
                setError(errorMessage);
                onError?.(errorMessage);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
            logger.error('useFetch error:', err);
            setError(errorMessage);
            onError?.(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (immediate) {
            fetchData();
        }
    }, []);

    return {
        data,
        isLoading,
        error,
        refetch: fetchData,
    };
}
