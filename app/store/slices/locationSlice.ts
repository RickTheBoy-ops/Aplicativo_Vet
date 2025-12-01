import { StateCreator } from 'zustand';

export interface LocationSlice {
  currentLocation: { lat: number; lng: number } | null;
  setLocation: (location: { lat: number; lng: number }) => void;
}

export const createLocationSlice: StateCreator<LocationSlice> = (set) => ({
  currentLocation: null,
  setLocation: (location) => set({ currentLocation: location }),
});
