export type Validator<T> = (value: T) => string | undefined;

export interface ValidationRule<T> {
  validate: (value: T) => boolean;
  message: string;
}
