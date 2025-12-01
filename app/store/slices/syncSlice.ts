import { StateCreator } from 'zustand';

export interface SyncSlice {
  isSyncing: boolean;
  lastSync: string | null;
  pendingChanges: number;
  startSync: () => Promise<void>;
}

export const createSyncSlice: StateCreator<SyncSlice> = (set) => ({
  isSyncing: false,
  lastSync: null,
  pendingChanges: 0,
  startSync: async () => {
    set({ isSyncing: true });
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        set({ isSyncing: false, lastSync: new Date().toISOString() });
    } catch (e) {
        set({ isSyncing: false });
    }
  },
});
