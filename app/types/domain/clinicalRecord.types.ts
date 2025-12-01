export interface ClinicalRecord {
  id: string;
  patientId: string;
  vetId: string;
  appointmentId?: string;
  date: string;
  subjective?: string; // SOAP - Subjective
  objective?: string;  // SOAP - Objective
  assessment?: string; // SOAP - Assessment
  plan?: string;       // SOAP - Plan
  diagnosis?: string;
  prescription?: string[];
  attachments?: string[]; // URLs
  createdAt: string;
  updatedAt: string;
}
