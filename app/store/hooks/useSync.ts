import { useStore } from '../store';

export const useSync = () => {
  const isSyncing = useStore((state) => state.isSyncing);
  const lastSync = useStore((state) => state.lastSync);
  const startSync = useStore((state) => state.startSync);

  return { isSyncing, lastSync, startSync };
};
