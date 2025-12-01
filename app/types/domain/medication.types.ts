export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  medications: Medication[];
  issuedAt: string;
  validUntil?: string;
  vetSignature?: string;
}
