import { apiClient } from './client';
import {
    PaymentMethod,
    Payment,
    CreatePaymentMethodRequest,
    ProcessPaymentRequest,
    PaymentIntent,
    Invoice,
} from '../../types/payment';
import { ApiResponse } from '../../types/common';

/**
 * Payment Service
 * Handles payment processing, payment methods, and invoice management
 */

/**
 * Get all payment methods for the current user
 */
export const getPaymentMethods = async (): Promise<
    ApiResponse<PaymentMethod[]>
> => {
    try {
        const response = await apiClient.get<ApiResponse<PaymentMethod[]>>(
            '/payments/methods',
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'PAYMENT_METHODS_FETCH_ERROR',
                message: 'Failed to fetch payment methods',
            },
        };
    }
};

/**
 * Add a new payment method
 */
export const addPaymentMethod = async (
    request: CreatePaymentMethodRequest,
): Promise<ApiResponse<PaymentMethod>> => {
    try {
        const response = await apiClient.post<ApiResponse<PaymentMethod>>(
            '/payments/methods',
            request,
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'PAYMENT_METHOD_ADD_ERROR',
                message: 'Failed to add payment method',
            },
        };
    }
};

/**
 * Delete a payment method
 */
export const deletePaymentMethod = async (
    methodId: string,
): Promise<ApiResponse<void>> => {
    try {
        const response = await apiClient.delete<ApiResponse<void>>(
            `/payments/methods/${methodId}`,
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'PAYMENT_METHOD_DELETE_ERROR',
                message: 'Failed to delete payment method',
            },
        };
    }
};

/**
 * Set default payment method
 */
export const setDefaultPaymentMethod = async (
    methodId: string,
): Promise<ApiResponse<void>> => {
    try {
        const response = await apiClient.put<ApiResponse<void>>(
            `/payments/methods/${methodId}/default`,
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'SET_DEFAULT_ERROR',
                message: 'Failed to set default payment method',
            },
        };
    }
};

/**
 * Create a payment intent for checkout
 */
export const createPaymentIntent = async (
    amount: number,
    currency: string = 'BRL',
    metadata?: Record<string, string>,
): Promise<ApiResponse<PaymentIntent>> => {
    try {
        const response = await apiClient.post<ApiResponse<PaymentIntent>>(
            '/payments/intents',
            { amount, currency, metadata },
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'PAYMENT_INTENT_ERROR',
                message: 'Failed to create payment intent',
            },
        };
    }
};

/**
 * Process a payment
 */
export const processPayment = async (
    request: ProcessPaymentRequest,
): Promise<ApiResponse<Payment>> => {
    try {
        const response = await apiClient.post<ApiResponse<Payment>>(
            '/payments/process',
            request,
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'PAYMENT_PROCESS_ERROR',
                message: 'Failed to process payment',
            },
        };
    }
};

/**
 * Get payment details
 */
export const getPayment = async (
    paymentId: string,
): Promise<ApiResponse<Payment>> => {
    try {
        const response = await apiClient.get<ApiResponse<Payment>>(
            `/payments/${paymentId}`,
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'PAYMENT_FETCH_ERROR',
                message: 'Failed to fetch payment details',
            },
        };
    }
};

/**
 * Get payment history
 */
export const getPaymentHistory = async (): Promise<ApiResponse<Payment[]>> => {
    try {
        const response = await apiClient.get<ApiResponse<Payment[]>>(
            '/payments/history',
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'PAYMENT_HISTORY_ERROR',
                message: 'Failed to fetch payment history',
            },
        };
    }
};

/**
 * Get all invoices
 */
export const getInvoices = async (): Promise<ApiResponse<Invoice[]>> => {
    try {
        const response = await apiClient.get<ApiResponse<Invoice[]>>(
            '/payments/invoices',
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'INVOICES_FETCH_ERROR',
                message: 'Failed to fetch invoices',
            },
        };
    }
};

/**
 * Get a specific invoice
 */
export const getInvoice = async (
    invoiceId: string,
): Promise<ApiResponse<Invoice>> => {
    try {
        const response = await apiClient.get<ApiResponse<Invoice>>(
            `/payments/invoices/${invoiceId}`,
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'INVOICE_FETCH_ERROR',
                message: 'Failed to fetch invoice',
            },
        };
    }
};

/**
 * Download invoice PDF
 */
export const downloadInvoicePDF = async (
    invoiceId: string,
): Promise<ApiResponse<Blob>> => {
    try {
        const response = await apiClient.get<Blob>(
            `/payments/invoices/${invoiceId}/pdf`,
            {
                responseType: 'blob',
            },
        );
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'INVOICE_DOWNLOAD_ERROR',
                message: 'Failed to download invoice',
            },
        };
    }
};

export const paymentService = {
    getPaymentMethods,
    addPaymentMethod,
    deletePaymentMethod,
    setDefaultPaymentMethod,
    createPaymentIntent,
    processPayment,
    getPayment,
    getPaymentHistory,
    getInvoices,
    getInvoice,
    downloadInvoicePDF,
};
