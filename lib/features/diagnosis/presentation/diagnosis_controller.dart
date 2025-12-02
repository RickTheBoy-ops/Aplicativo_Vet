import 'package:flutter/foundation.dart';
import '../data/diagnosis_repository.dart';

class DiagnosisProvider extends ChangeNotifier {

  DiagnosisProvider({DiagnosisRepository? repository})
      : _repository = repository ?? DiagnosisRepositoryMock();
  final DiagnosisRepository _repository;

  List<DiagnosisModel>? _diagnoses;
  bool _isLoading = false;
  String? _error;

  List<DiagnosisModel>? get diagnoses => _diagnoses;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> analyzeImage(String imagePath) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final result = await _repository.analyzeImage(imagePath);
      _diagnoses = result;
      _error = null;
    } on Exception catch (e) {
      _error = e.toString();
      _diagnoses = null;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void reset() {
    _diagnoses = null;
    _error = null;
    _isLoading = false;
    notifyListeners();
  }
}
