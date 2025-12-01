export type Species = 'dog' | 'cat' | 'bird' | 'reptile' | 'rodent' | 'other';
export type Gender = 'M' | 'F';

export interface Patient {
  id: string;
  name: string;
  species: Species;
  breed: string;
  age: number; // in months
  weight: number; // in kg
  gender?: Gender;
  photoUrl?: string;
  ownerId: string;
  microchipNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
