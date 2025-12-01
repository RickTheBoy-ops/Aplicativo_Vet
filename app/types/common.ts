export interface Location {
    latitude: number;
    longitude: number;
    accuracy?: number;
    altitude?: number;
    heading?: number;
    speed?: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: ApiError;
    message?: string;
}

export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: Pagination;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface SortParams {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface Notification {
    id: string;
    userId: string;
    title: string;
    body: string;
    data?: Record<string, unknown>;
    type: NotificationType;
    isRead: boolean;
    createdAt: string;
}

export type NotificationType =
    | 'booking_created'
    | 'booking_confirmed'
    | 'booking_cancelled'
    | 'booking_reminder'
    | 'review_received'
    | 'subscription_expiring'
    | 'subscription_expired'
    | 'payment_failed'
    | 'payment_succeeded';

export interface ValidationError {
    field: string;
    message: string;
}

export interface FormState<T> {
    values: T;
    errors: Record<keyof T, string>;
    touched: Record<keyof T, boolean>;
    isSubmitting: boolean;
    isValid: boolean;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
