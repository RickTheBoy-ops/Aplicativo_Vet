class PrescriptionModel {
  final String vetName;
  final String crmv;
  final String animalName;
  final String ownerName;
  final String diagnosis;
  final List<Medication> medications;
  final String observations;
  final DateTime date;

  PrescriptionModel({
    required this.vetName,
    required this.crmv,
    required this.animalName,
    required this.ownerName,
    required this.diagnosis,
    required this.medications,
    required this.observations,
    required this.date,
  });
}

class Medication {
  final String name;
  final String dosage;
  final String frequency;
  final String duration;

  Medication({
    required this.name,
    required this.dosage,
    required this.frequency,
    required this.duration,
  });
}
