import '../../../data/models/animal_model.dart';
import '../domain/vaccine_model.dart';

class VaccineSchedulerService {
  List<VaccineRecommendation> getVaccineSchedule(AnimalModel animal) {
    if (animal.species.toLowerCase() == 'cachorro') {
      return _getDogSchedule(animal);
    } else {
      // Placeholder for other species
      return [];
    }
  }

  List<VaccineRecommendation> _getDogSchedule(AnimalModel animal) {
    final recommendations = <VaccineRecommendation>[
      // V10 and Rabies are annual for adult dogs
      VaccineRecommendation(
        vaccineName: 'V10 (Múltipla)',
        dueDate: DateTime.now().add(const Duration(days: 365)),
        status: VaccineStatus.pending,
        details: 'Proteção contra cinomose, parvovirose, etc.',
      ),
      VaccineRecommendation(
        vaccineName: 'Antirrábica',
        dueDate: DateTime.now().add(const Duration(days: 365)),
        status: VaccineStatus.pending,
        details: 'Obrigatória por lei. Protege contra a raiva.',
      ),
    ];

    if (animal.age != null && animal.age! < 1) {
      // Puppy specific schedule
      recommendations.insertAll(0, [
        VaccineRecommendation(
          vaccineName: 'V10 - 1ª Dose',
          dueDate: DateTime.now().add(const Duration(days: 45)),
          status: VaccineStatus.pending,
        ),
        VaccineRecommendation(
          vaccineName: 'V10 - 2ª Dose',
          dueDate: DateTime.now().add(const Duration(days: 66)),
          status: VaccineStatus.pending,
        ),
        VaccineRecommendation(
          vaccineName: 'V10 - 3ª Dose',
          dueDate: DateTime.now().add(const Duration(days: 87)),
          status: VaccineStatus.pending,
        ),
      ]);
    }

    // Simulate a past due vaccine for demonstration
    recommendations.add(
      VaccineRecommendation(
        vaccineName: 'Tosse dos Canis',
        dueDate: DateTime.now().subtract(const Duration(days: 30)),
        status: VaccineStatus.overdue,
        details: 'Opcional, mas recomendada para cães com contato social.',
      ),
    );
    
    // Simulate a completed vaccine
    recommendations.add(
      VaccineRecommendation(
        vaccineName: 'Giárdia',
        dueDate: DateTime.now().subtract(const Duration(days: 180)),
        status: VaccineStatus.done,
        details: 'Proteção contra o protozoário Giardia.',
      ),
    );


    return recommendations;
  }
}
