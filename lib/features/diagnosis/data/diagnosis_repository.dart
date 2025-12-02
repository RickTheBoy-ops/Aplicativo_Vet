class DiagnosisModel {

  DiagnosisModel({
    required this.id,
    required this.diseaseName,
    required this.probability,
    required this.description,
    required this.nextSteps,
  });
  final String id;
  final String diseaseName;
  final double probability;
  final String description;
  final List<String> nextSteps;
}

class DiagnosisRepository {
  Future<List<DiagnosisModel>> analyzeImage(String imagePath) =>
      throw UnimplementedError();
}

class DiagnosisRepositoryMock implements DiagnosisRepository {
  @override
  Future<List<DiagnosisModel>> analyzeImage(String imagePath) async {
    // Simulate network delay
    await Future<void>.delayed(const Duration(seconds: 2));

    // Return mock data
    return [
      DiagnosisModel(
        id: '1',
        diseaseName: 'Dermatite Alérgica',
        probability: 0.95,
        description: 'Inflamação da pele causada por alérgenos.',
        nextSteps: [
          'Prescrever antialérgico',
          'Recomendar shampoo hipoalergênico',
        ],
      ),
      DiagnosisModel(
        id: '2',
        diseaseName: 'Sarna Sarcóptica',
        probability: 0.15,
        description: 'Infecção parasitária da pele.',
        nextSteps: ['Realizar raspado de pele', 'Isolar o animal'],
      ),
    ];
  }
}
