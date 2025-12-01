import NetInfo from '@react-native-community/netinfo';
import { getSyncQueue } from './syncQueue';

export const isOnline = async () => {
    const state = await NetInfo.fetch();
    return state.isConnected && state.isInternetReachable;
};

export const processSyncQueue = async () => {
    if (!(await isOnline())) {
        return;
    }

    const queue = getSyncQueue();
    if (queue.length === 0) return;

    // Process items
    console.log('Processing sync queue...', queue.length, 'items');
    // Here we would iterate and call API
};
