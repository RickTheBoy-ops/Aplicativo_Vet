enum VaccineStatus { done, pending, overdue }

class VaccineRecommendation {
  final String vaccineName;
  final DateTime dueDate;
  final VaccineStatus status;
  final String? details;

  VaccineRecommendation({
    required this.vaccineName,
    required this.dueDate,
    required this.status,
    this.details,
  });
}
