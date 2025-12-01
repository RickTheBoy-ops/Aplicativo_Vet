export type PaymentMethod = 'credit_card' | 'debit_card' | 'cash' | 'pix' | 'insurance';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Invoice {
  id: string;
  appointmentId: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: PaymentStatus;
  paymentMethod?: PaymentMethod;
  issuedAt: string;
  paidAt?: string;
  dueDate: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
