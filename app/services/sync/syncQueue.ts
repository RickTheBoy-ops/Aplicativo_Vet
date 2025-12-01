import { getRealm } from '../database/realm';

interface SyncItem {
    id: string;
    collection: string;
    operation: 'create' | 'update' | 'delete';
    data: any;
}

export const addToSyncQueue = async (collection: string, operation: 'create' | 'update' | 'delete', data: any) => {
    const realm = await getRealm();
    realm.write(() => {
        realm.create('SyncQueue', {
            id: data.id || Date.now().toString(),
            collection,
            operation,
            data: JSON.stringify(data),
            createdAt: new Date(),
            attempts: 0
        });
    });
};

export const getSyncQueue = async (): Promise<SyncItem[]> => {
    const realm = await getRealm();
    const queue = realm.objects('SyncQueue').sorted('createdAt');
    return queue.map((item: any) => ({
        id: item.id,
        collection: item.collection,
        operation: item.operation,
        data: JSON.parse(item.data),
    }));
};

export const removeFromSyncQueue = async (id: string) => {
    const realm = await getRealm();
    realm.write(() => {
        const item = realm.objectForPrimaryKey('SyncQueue', id);
        if (item) {
            realm.delete(item);
        }
    });
};
