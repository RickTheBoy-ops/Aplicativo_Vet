import NetInfo from '@react-native-community/netinfo';
import { getSyncQueue, removeFromSyncQueue } from './syncQueue';
// import { api } from '@services/api'; // Assuming a generic API service exists, placeholder for now

export const isOnline = async () => {
    const state = await NetInfo.fetch();
    return state.isConnected && state.isInternetReachable;
};

export const processSyncQueue = async () => {
    if (!(await isOnline())) {
        return;
    }

    const queue = await getSyncQueue();
    if (queue.length === 0) return;

    console.log('Processing sync queue...', queue.length, 'items');

    for (const item of queue) {
        try {
            // Placeholder logic for API calls based on collection and operation
            console.log(`Processing ${item.operation} on ${item.collection} with id ${item.id}`);

            // TODO: Implement actual API calls here.
            // DO NOT delete items from the queue unless the API call is successful.
            // Failing to do so results in data loss.

            // Example structure for future implementation:
            /*
            let success = false;
            if (item.collection === 'bookings') {
                 if (item.operation === 'create') {
                     // await bookingService.createBooking(item.data);
                     // success = true;
                 }
            }

            if (success) {
                await removeFromSyncQueue(item.id);
            }
            */

            // For now, we just log that we would have processed it.
            // We do NOT remove it from the queue to preserve data integrity until real backend is connected.
            console.log(`[MOCK] Would attempt sync for item ${item.id}. Keeping in queue to prevent data loss.`);

        } catch (error) {
            console.error(`Failed to sync item ${item.id}`, error);
            // In a real scenario, we might increment attempts or backoff
        }
    }
};

export const setupOfflineListener = () => {
    return NetInfo.addEventListener(state => {
        if (state.isConnected && state.isInternetReachable) {
            console.log('Connection restored. Processing sync queue...');
            processSyncQueue();
        }
    });
};
