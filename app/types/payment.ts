export interface PaymentMethod {
    id: string;
    type: 'credit_card' | 'debit_card' | 'pix';
    isDefault: boolean;
    createdAt: string;

    // Card specific fields
    cardLast4?: string;
    cardBrand?: 'visa' | 'mastercard' | 'amex' | 'elo' | 'other';
    cardExpiryMonth?: number;
    cardExpiryYear?: number;
    cardHolderName?: string;
}

export interface Payment {
    id: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    paymentMethodId: string;
    subscriptionId?: string;
    bookingId?: string;
    description: string;
    createdAt: string;
    paidAt?: string;
    failureReason?: string;
}

export type PaymentStatus =
    | 'pending'
    | 'processing'
    | 'succeeded'
    | 'failed'
    | 'cancelled'
    | 'refunded';

export interface CreatePaymentMethodRequest {
    type: 'credit_card' | 'debit_card' | 'pix';
    cardNumber?: string;
    cardExpiryMonth?: number;
    cardExpiryYear?: number;
    cardCvv?: string;
    cardHolderName?: string;
    isDefault?: boolean;
}

export interface ProcessPaymentRequest {
    amount: number;
    paymentMethodId: string;
    subscriptionId?: string;
    bookingId?: string;
    description: string;
}

export interface PaymentIntent {
    id: string;
    clientSecret: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
}

export interface Invoice {
    id: string;
    paymentId: string;
    amount: number;
    currency: string;
    description: string;
    pdfUrl?: string;
    createdAt: string;
}
