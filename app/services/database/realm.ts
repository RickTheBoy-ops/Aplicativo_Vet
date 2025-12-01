import Realm from 'realm';
import { PatientSchema, AppointmentSchema, SyncQueueSchema } from './schemas';

let realm: Realm;

export const getRealm = async (): Promise<Realm> => {
  if (realm && !realm.isClosed) {
    return realm;
  }

  realm = await Realm.open({
    schema: [PatientSchema, AppointmentSchema, SyncQueueSchema],
    schemaVersion: 2, // Increment schema version for the new schema
  });

  return realm;
};

export const closeRealm = () => {
  if (realm && !realm.isClosed) {
    realm.close();
  }
};
