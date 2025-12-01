import { z } from 'zod';

export const appointmentSchema = z.object({
  vetId: z.string().uuid(),
  ownerId: z.string().uuid(),
  patientId: z.string().uuid(),
  dateTime: z.string().datetime(),
  type: z.enum(['consultation', 'vaccination', 'surgery', 'emergency', 'follow_up', 'checkup']),
  reason: z.string().optional(),
  notes: z.string().optional(),
});

export type AppointmentSchema = z.infer<typeof appointmentSchema>;
