export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  userType: 'owner' | 'vet';
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isVerified: boolean;
}

export interface Owner extends User {
  userType: 'owner';
  address: Address;
  animals: Animal[];
}

export interface Vet extends User {
  userType: 'vet';
  crmv: string;
  specialties: Specialty[];
  bio: string;
  photoUrl?: string;
  certifications: Certification[];
  yearsOfExperience: number;
  rating: number;
  totalReviews: number;
  availability: Availability[];
  serviceRadius: number; // em km
  serviceLocations: ServiceLocation[];
  subscription: Subscription;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface Animal {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'reptile' | 'rodent' | 'other';
  breed: string;
  age: number; // em meses
  weight: number; // em kg
  photoUrl?: string;
  medicalHistory?: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Specialty {
  id: string;
  name: string;
  category: 'small_animals' | 'large_animals' | 'exotics' | 'general' | 'emergency' | 'surgery';
}

export interface Certification {
  id: string;
  name: string;
  institution: string;
  year: number;
  documentUrl?: string;
}

export interface Availability {
  id: string;
  vetId: string;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 6 = Saturday
  startTime: string; // formato: "HH:mm"
  endTime: string; // formato: "HH:mm"
  isActive: boolean;
}

export interface UnavailablePeriod {
  id: string;
  vetId: string;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface ServiceLocation {
  id: string;
  vetId: string;
  name: string;
  address: Address;
  isPrimary: boolean;
}

export interface Review {
  id: string;
  bookingId: string;
  vetId: string;
  ownerId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  vetId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'inactive' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  appointmentsUsed: number;
  appointmentsLimit: number;
}

export type SubscriptionPlan = 'free' | 'basic' | 'premium';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  phone: string;
  name: string;
  userType: 'owner' | 'vet';
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}
