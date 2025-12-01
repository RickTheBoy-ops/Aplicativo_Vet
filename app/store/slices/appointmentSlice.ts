import { StateCreator } from 'zustand';
import { Appointment } from '../../types/domain/appointment.types';

export interface AppointmentSlice {
  appointments: Appointment[];
  appointmentsLoading: boolean;
  appointmentsError: string | null;
  fetchAppointments: () => Promise<void>;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
}

export const createAppointmentSlice: StateCreator<AppointmentSlice> = (set) => ({
  appointments: [],
  appointmentsLoading: false,
  appointmentsError: null,
  fetchAppointments: async () => {
    set({ appointmentsLoading: true });
    try {
      // Mock fetch
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ appointments: [], appointmentsLoading: false });
    } catch (e) {
      set({ appointmentsError: 'Failed to fetch appointments', appointmentsLoading: false });
    }
  },
  addAppointment: (appointment) =>
    set((state) => ({ appointments: [...state.appointments, appointment] })),
  updateAppointment: (id, updates) =>
    set((state) => ({
      appointments: state.appointments.map((appt) =>
        appt.id === id ? { ...appt, ...updates } : appt
      ),
    })),
});
