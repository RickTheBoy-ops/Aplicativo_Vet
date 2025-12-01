import { ZodSchema, ZodError } from 'zod';

export const validate = <T>(schema: ZodSchema<T>, data: unknown): { success: boolean; data?: T; errors?: Record<string, string[]> } => {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        if (!formattedErrors[path]) {
          formattedErrors[path] = [];
        }
        formattedErrors[path].push(err.message);
      });
      return { success: false, errors: formattedErrors };
    }
    return { success: false, errors: { _global: ['Unknown validation error'] } };
  }
};
