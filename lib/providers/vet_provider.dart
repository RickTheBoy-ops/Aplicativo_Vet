import 'package:flutter/foundation.dart';
import '../data/models/user_model.dart';
import '../data/services/api/api_client.dart';
import '../data/services/api/vet_service.dart';

/// Provider para gerenciar estado de veterinários
class VetProvider extends ChangeNotifier {
  final VetService _vetService;
  
  List<UserModel> _vets = [];
  UserModel? _selectedVet;
  bool _isLoading = false;
  String? _error;

  // Search filters
  double? _latitude;
  double? _longitude;
  double? _radius;
  List<String>? _selectedSpecialties;
  double? _minRating;
  bool? _isAvailable;

  VetProvider({VetService? vetService})
      : _vetService = vetService ?? VetService(apiClient: ApiClient());

  // Getters
  List<UserModel> get vets => _vets;
  UserModel? get selectedVet => _selectedVet;
  bool get isLoading => _isLoading;
  String? get error => _error;
  double? get latitude => _latitude;
  double? get longitude => _longitude;
  double? get radius => _radius;
  List<String>? get selectedSpecialties => _selectedSpecialties;
  double? get minRating => _minRating;
  bool? get isAvailable => _isAvailable;

  /// Buscar veterinários com filtros
  Future<void> searchVets({
    double? latitude,
    double? longitude,
    double? radius,
    List<String>? specialties,
    double? minRating,
    bool? isAvailable,
    int page = 1,
  }) async {
    _setLoading(true);
    _error = null;

    try {
      _vets = await _vetService.searchVets(
        latitude: latitude ?? _latitude,
        longitude: longitude ?? _longitude,
        radius: radius ?? _radius,
        specialties: specialties ?? _selectedSpecialties,
        minRating: minRating ?? _minRating,
        isAvailable: isAvailable ?? _isAvailable,
        page: page,
      );
      
      // Update filters
      if (latitude != null) _latitude = latitude;
      if (longitude != null) _longitude = longitude;
      if (radius != null) _radius = radius;
      if (specialties != null) _selectedSpecialties = specialties;
      if (minRating != null) _minRating = minRating;
      if (isAvailable != null) _isAvailable = isAvailable;
      
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  /// Obter veterinários em destaque
  Future<void> loadFeaturedVets({int limit = 10}) async {
    _setLoading(true);
    _error = null;

    try {
      _vets = await _vetService.getFeaturedVets(limit: limit);
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  /// Obter veterinários próximos
  Future<void> loadNearbyVets({
    required double latitude,
    required double longitude,
    double radius = 10.0,
  }) async {
    _setLoading(true);
    _error = null;

    try {
      _vets = await _vetService.getNearbyVets(
        latitude: latitude,
        longitude: longitude,
        radius: radius,
      );
      
      _latitude = latitude;
      _longitude = longitude;
      _radius = radius;
      
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  /// Selecionar um veterinário
  Future<void> selectVet(String vetId) async {
    _setLoading(true);
    _error = null;

    try {
      _selectedVet = await _vetService.getVetById(vetId);
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  /// Limpar seleção
  void clearSelection() {
    _selectedVet = null;
    notifyListeners();
  }

  /// Atualizar filtro de especialidades
  void updateSpecialtiesFilter(List<String> specialties) {
    _selectedSpecialties = specialties;
    notifyListeners();
  }

  /// Atualizar filtro de rating mínimo
  void updateMinRatingFilter(double? rating) {
    _minRating = rating;
    notifyListeners();
  }

  /// Atualizar filtro de disponibilidade
  void updateAvailabilityFilter(bool? available) {
    _isAvailable = available;
    notifyListeners();
  }

  /// Atualizar raio de busca
  void updateRadiusFilter(double? newRadius) {
    _radius = newRadius;
    notifyListeners();
  }

  /// Limpar todos os filtros
  void clearFilters() {
    _selectedSpecialties = null;
    _minRating = null;
    _isAvailable = null;
    _radius = null;
    notifyListeners();
  }

  /// Limpar erro
  void clearError() {
    _error = null;
    notifyListeners();
  }

  void _setLoading(bool value) {
    _isLoading = value;
    notifyListeners();
  }
}
