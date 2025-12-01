export const PatientSchema = {
  name: 'Patient',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    species: 'string',
    breed: 'string',
    age: 'int',
    weight: 'double',
    ownerId: 'string',
    createdAt: 'date',
    updatedAt: 'date',
    synced: { type: 'bool', default: false },
  },
};

export const AppointmentSchema = {
  name: 'Appointment',
  primaryKey: 'id',
  properties: {
    id: 'string',
    vetId: 'string',
    ownerId: 'string',
    patientId: 'string',
    status: 'string',
    type: 'string',
    dateTime: 'date',
    createdAt: 'date',
    updatedAt: 'date',
    synced: { type: 'bool', default: false },
  },
};
