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

  /// Executa uma ação assíncrona, gerenciando o estado de loading e erros.
  Future<void> _executeAction(Future<void> Function() action) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await action();
    } on Exception catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

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
    await _executeAction(() async {
      _vets = await _vetService.searchVets(
        latitude: latitude ?? _latitude,
        longitude: longitude ?? _longitude,
        radius: radius ?? _radius,
        specialties: specialties ?? _selectedSpecialties,
        minRating: minRating ?? _minRating,
        isAvailable: isAvailable ?? _isAvailable,
        page: page,
      );
      // Atualiza os filtros locais
      if (latitude != null) _latitude = latitude;
      if (longitude != null) _longitude = longitude;
      if (radius != null) _radius = radius;
      if (specialties != null) _selectedSpecialties = specialties;
      if (minRating != null) _minRating = minRating;
      if (isAvailable != null) _isAvailable = isAvailable;
    });
  }

  /// Obter veterinários em destaque
  Future<void> loadFeaturedVets({int limit = 10}) async {
    await _executeAction(() async {
      _vets = await _vetService.getFeaturedVets(limit: limit);
    });
  }

  /// Obter veterinários próximos
  Future<void> loadNearbyVets({
    required double latitude,
    required double longitude,
    double radius = 10.0,
  }) async {
    await _executeAction(() async {
      _vets = await _vetService.getNearbyVets(
        latitude: latitude,
        longitude: longitude,
        radius: radius,
      );
      _latitude = latitude;
      _longitude = longitude;
      _radius = radius;
    });
  }

  /// Inicia o stream de localização para buscar veterinários próximos continuamente.
  Future<void> startLocationStream({double defaultRadiusKm = 10.0}) async {
    final hasPermission = await _ensureLocationPermission();
    if (!hasPermission) {
      _error = 'Permissão de localização negada';
      notifyListeners();
      return;
    }

    await _executeAction(() async {
      final current = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );
      await loadNearbyVets(
        latitude: current.latitude,
        longitude: current.longitude,
        radius: _radius ?? defaultRadiusKm,
      );

      await _positionSub?.cancel();
      _positionSub = Geolocator.getPositionStream(locationSettings: _locationSettings)
          .listen((pos) async {
        await loadNearbyVets(latitude: pos.latitude, longitude: pos.longitude, radius: _radius ?? 10.0);
      }, onError: (Object e) {
        _error = e.toString();
        notifyListeners();
      });
    });
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

  Future<bool> _ensureLocationPermission() async {
    final serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      _error = 'Serviços de localização desativados';
      return false;
    }

    var permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
    }
    return permission != LocationPermission.denied &&
        permission != LocationPermission.deniedForever;
  }

  /// Selecionar um veterinário
  Future<void> selectVet(String vetId) async {
    await _executeAction(() async {
      _selectedVet = await _vetService.getVetById(vetId);
    });
  }

  /// Limpar seleção
  void clearSelection() {
    _selectedVet = null;
    notifyListeners();
  }

  /// Métodos para atualização de filtros (síncronos)
  void updateSpecialtiesFilter(List<String> specialties) {
    _selectedSpecialties = specialties;
    notifyListeners();
  }

  void updateMinRatingFilter(double? rating) {
    _minRating = rating;
    notifyListeners();
  }

  void updateAvailabilityFilter({bool? available}) {
    _isAvailable = available;
    notifyListeners();
  }

  void updateRadiusFilter(double? newRadius) {
    _radius = newRadius;
    notifyListeners();
  }

  void clearFilters() {
    _selectedSpecialties = null;
    _minRating = null;
    _isAvailable = null;
    _radius = null;
    notifyListeners();
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }

  @override
  void dispose() {
    _positionSub?.cancel();
    super.dispose();
  }
}
