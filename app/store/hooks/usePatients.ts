import { useStore } from '../store';

export const usePatients = () => {
  const patients = useStore((state) => state.patients);
  const loading = useStore((state) => state.patientsLoading);
  const error = useStore((state) => state.patientsError);
  const fetchPatients = useStore((state) => state.fetchPatients);

  return { patients, loading, error, fetchPatients };
};
