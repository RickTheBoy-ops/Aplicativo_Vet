import { z } from 'zod';

export const treatmentSchema = z.object({
  appointmentId: z.string().uuid(),
  description: z.string().min(10, 'Descrição deve ser detalhada'),
  procedures: z.array(z.string()).min(1, 'Pelo menos um procedimento é necessário'),
  medications: z.array(z.string()).optional(),
  cost: z.number().min(0),
  notes: z.string().optional(),
});

export type TreatmentSchema = z.infer<typeof treatmentSchema>;
