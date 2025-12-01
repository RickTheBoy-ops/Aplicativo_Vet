import { useStore } from '../store';

export const useAppointments = () => {
  const appointments = useStore((state) => state.appointments);
  const loading = useStore((state) => state.appointmentsLoading);
  const error = useStore((state) => state.appointmentsError);
  const fetchAppointments = useStore((state) => state.fetchAppointments);
  const addAppointment = useStore((state) => state.addAppointment);

  return { appointments, loading, error, fetchAppointments, addAppointment };
};
