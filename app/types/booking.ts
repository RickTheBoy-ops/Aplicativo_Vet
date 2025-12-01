import { Animal, Address } from './user';

export interface Booking {
  id: string;
  ownerId: string;
  vetId: string;
  animalId: string;
  status: BookingStatus;
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // em minutos
  serviceLocation: Address;
  notes?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;

  // Populated fields
  animal?: Animal;
  ownerName?: string;
  vetName?: string;
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled_by_owner'
  | 'cancelled_by_vet'
  | 'no_show';

export interface CreateBookingRequest {
  vetId: string;
  animalId: string;
  scheduledDate: string;
  scheduledTime: string;
  serviceLocation: Address;
  notes?: string;
}

export interface UpdateBookingRequest {
  status?: BookingStatus;
  scheduledDate?: string;
  scheduledTime?: string;
  notes?: string;
  cancellationReason?: string;
}

export interface BookingFilters {
  status?: BookingStatus[];
  startDate?: string;
  endDate?: string;
  vetId?: string;
  ownerId?: string;
}
