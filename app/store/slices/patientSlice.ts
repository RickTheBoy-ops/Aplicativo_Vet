import { StateCreator } from 'zustand';
import { Patient } from '../../types/domain/patient.types';

export interface PatientSlice {
  patients: Patient[];
  patientsLoading: boolean;
  patientsError: string | null;
  fetchPatients: () => Promise<void>;
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
}

export const createPatientSlice: StateCreator<PatientSlice> = (set) => ({
  patients: [],
  patientsLoading: false,
  patientsError: null,
  fetchPatients: async () => {
    set({ patientsLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ patients: [], patientsLoading: false });
    } catch (e) {
      set({ patientsError: 'Failed to fetch patients', patientsLoading: false });
    }
  },
  addPatient: (patient) =>
    set((state) => ({ patients: [...state.patients, patient] })),
  updatePatient: (id, updates) =>
    set((state) => ({
      patients: state.patients.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    })),
});
