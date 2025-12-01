import Realm from 'realm';
import { PatientSchema, AppointmentSchema } from './schemas';

let realm: Realm;

export const getRealm = async (): Promise<Realm> => {
  if (realm && !realm.isClosed) {
    return realm;
  }

  realm = await Realm.open({
    schema: [PatientSchema, AppointmentSchema],
    schemaVersion: 1,
  });

  return realm;
};

export const closeRealm = () => {
  if (realm && !realm.isClosed) {
    realm.close();
  }
};
