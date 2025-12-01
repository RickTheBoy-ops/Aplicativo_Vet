import { z } from 'zod';

export const patientSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  species: z.enum(['dog', 'cat', 'bird', 'reptile', 'rodent', 'other']),
  breed: z.string().min(2, 'Raça é obrigatória'),
  age: z.number().min(0, 'Idade deve ser positiva').max(300, 'Idade inválida'), // months
  weight: z.number().min(0.1, 'Peso deve ser maior que 0'),
  gender: z.enum(['M', 'F']).optional(),
  ownerId: z.string().uuid('ID do proprietário inválido'),
  microchipNumber: z.string().optional(),
  notes: z.string().optional(),
});

export type PatientSchema = z.infer<typeof patientSchema>;
