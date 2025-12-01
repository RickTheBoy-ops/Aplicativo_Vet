export type AppointmentStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
export type AppointmentType = 'consultation' | 'vaccination' | 'surgery' | 'emergency' | 'follow_up' | 'checkup';

export interface Appointment {
  id: string;
  vetId: string;
  ownerId: string;
  patientId: string;
  status: AppointmentStatus;
  type: AppointmentType;
  dateTime: string; // ISO date
  durationMinutes: number;
  reason?: string;
  notes?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  createdAt: string;
  updatedAt: string;
}
