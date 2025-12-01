import { create } from 'zustand';
import { createAppointmentSlice, AppointmentSlice } from './slices/appointmentSlice';
import { createPatientSlice, PatientSlice } from './slices/patientSlice';
import { createLocationSlice, LocationSlice } from './slices/locationSlice';
import { createSyncSlice, SyncSlice } from './slices/syncSlice';
import { createAuthSlice, AuthSlice } from './slices/authSlice';

type StoreState = AppointmentSlice & PatientSlice & LocationSlice & SyncSlice & AuthSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createAppointmentSlice(...a),
  ...createPatientSlice(...a),
  ...createLocationSlice(...a),
  ...createSyncSlice(...a),
  ...createAuthSlice(...a),
}));
