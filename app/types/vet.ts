import { Vet, Review } from './user';

export interface VetSearchFilters {
    specialties?: string[];
    minRating?: number;
    maxDistance?: number; // em km
    availableDate?: string;
    availableTime?: string;
    city?: string;
    state?: string;
}

export interface VetSearchResult extends Vet {
    distance: number; // distância em km do usuário
    nextAvailableSlot?: TimeSlot;
    reviews: Review[];
}

export interface TimeSlot {
    date: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}

export interface VetProfile extends Vet {
    reviews: Review[];
    upcomingAvailability: TimeSlot[];
}
