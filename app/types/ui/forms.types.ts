export type ValidationResult = {
  isValid: boolean;
  errors?: Record<string, string[]>;
};

export interface FormField<T> {
  value: T;
  error?: string;
  touched: boolean;
}
