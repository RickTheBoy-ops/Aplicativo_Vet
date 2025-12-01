interface SyncItem {
    id: string;
    collection: string;
    operation: 'create' | 'update' | 'delete';
    data: any;
}

const queue: SyncItem[] = [];

export const addToSyncQueue = async (collection: string, operation: 'create' | 'update' | 'delete', data: any) => {
    queue.push({
        id: data.id,
        collection,
        operation,
        data
    });
    // In a real app, persist this queue to DB
};

export const getSyncQueue = () => queue;
