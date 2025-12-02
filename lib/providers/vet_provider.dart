import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:geolocator/geolocator.dart';

import '../data/models/user_model.dart';
import '../data/services/api/api_client.dart';
import '../data/services/api/vet_service.dart';

/// Provider para gerenciar estado de veterinários
class VetProvider extends ChangeNotifier {

  VetProvider({VetService? vetService})
      : _vetService = vetService ?? VetService(apiClient: ApiClient());
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

  StreamSubscription<Position>? _positionSub;
  LocationSettings _locationSettings = const LocationSettings(
    accuracy: LocationAccuracy.high,
    distanceFilter: 50,
  );

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

  Future<void> startLocationStream({double defaultRadiusKm = 10.0}) async {
    final hasPermission = await _ensureLocationPermission();
    if (!hasPermission) {
      _error = 'Permissão de localização negada';
      notifyListeners();
      return;
    }

    final current = await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high,
    );
    _latitude = current.latitude;
    _longitude = current.longitude;
    _radius ??= defaultRadiusKm;
    await _loadNearbyFromCurrent();

    await _positionSub?.cancel();
    _positionSub =
        Geolocator.getPositionStream(locationSettings: _locationSettings)
            .listen((pos) async {
      _latitude = pos.latitude;
      _longitude = pos.longitude;
      await _loadNearbyFromCurrent();
    }, onError: (e) {
      _error = e.toString();
      notifyListeners();
    },);
  }

  Future<void> stopLocationStream() async {
    await _positionSub?.cancel();
    _positionSub = null;
  }

  void updateLocationSettings(LocationSettings settings) {
    _locationSettings = settings;
    if (_positionSub != null) {
      startLocationStream(defaultRadiusKm: _radius ?? 10.0);
    }
  }

  Future<void> _loadNearbyFromCurrent() async {
    final lat = _latitude;
    final lng = _longitude;
    final rad = _radius ?? 10.0;
    if (lat == null || lng == null) return;
    await loadNearbyVets(latitude: lat, longitude: lng, radius: rad);
  }

  Future<bool> _ensureLocationPermission() async {
    final serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      _error = 'Serviços de localização desativados';
      notifyListeners();
      return false;
    }

    var permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
    }
    if (permission == LocationPermission.denied ||
        permission == LocationPermission.deniedForever) {
      return false;
    }
    return true;
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

  @override
  void dispose() {
    _positionSub?.cancel();
    super.dispose();
  }
}
