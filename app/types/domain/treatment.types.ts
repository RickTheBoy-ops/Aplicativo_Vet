export interface Treatment {
  id: string;
  appointmentId: string;
  description: string;
  procedures: string[];
  medications: string[]; // IDs or names
  notes?: string;
  cost: number;
  createdAt: string;
  updatedAt: string;
}
