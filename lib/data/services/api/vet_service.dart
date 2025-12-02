import '../../models/user_model.dart';
import 'api_client.dart';

/// Serviço de Veterinários
class VetService {
  final ApiClient _apiClient;

  VetService({required ApiClient apiClient}) : _apiClient = apiClient;

  /// Buscar veterinários com filtros
  Future<List<UserModel>> searchVets({
    double? latitude,
    double? longitude,
    double? radius, // em km
    List<String>? specialties,
    double? minRating,
    bool? isAvailable,
    int page = 1,
    int limit = 20,
  }) async {
    final response = await _apiClient.get(
      '/vets/search',
      queryParameters: {
        if (latitude != null) 'latitude': latitude,
        if (longitude != null) 'longitude': longitude,
        if (radius != null) 'radius': radius,
        if (specialties != null && specialties.isNotEmpty)
          'specialties': specialties.join(','),
        if (minRating != null) 'minRating': minRating,
        if (isAvailable != null) 'isAvailable': isAvailable,
        'page': page,
        'limit': limit,
      },
    );

    final data = response.data['vets'] as List;
    return data.map((json) => UserModel.fromJson(json)).toList();
  }

  /// Obter detalhes de um veterinário
  Future<UserModel> getVetById(String id) async {
    final response = await _apiClient.get('/vets/$id');
    return UserModel.fromJson(response.data as Map<String, dynamic>);
  }

  /// Obter veterinários em destaque
  Future<List<UserModel>> getFeaturedVets({int limit = 10}) async {
    final response = await _apiClient.get(
      '/vets/featured',
      queryParameters: {'limit': limit},
    );

    final data = response.data['vets'] as List;
    return data.map((json) => UserModel.fromJson(json)).toList();
  }

  /// Obter veterinários próximos
  Future<List<UserModel>> getNearbyVets({
    required double latitude,
    required double longitude,
    double radius = 10.0,
    int limit = 20,
  }) async {
    final response = await _apiClient.get(
      '/vets/nearby',
      queryParameters: {
        'latitude': latitude,
        'longitude': longitude,
        'radius': radius,
        'limit': limit,
      },
    );

    final data = response.data['vets'] as List;
    return data.map((json) => UserModel.fromJson(json)).toList();
  }

  /// Atualizar disponibilidade (vet)
  Future<UserModel> updateAvailability(bool isAvailable) async {
    final response = await _apiClient.patch(
      '/vets/availability',
      data: {'isAvailable': isAvailable},
    );
    return UserModel.fromJson(response.data as Map<String, dynamic>);
  }

  /// Atualizar localização (vet)
  Future<UserModel> updateLocation({
    required double latitude,
    required double longitude,
  }) async {
    final response = await _apiClient.patch(
      '/vets/location',
      data: {
        'latitude': latitude,
        'longitude': longitude,
      },
    );
    return UserModel.fromJson(response.data as Map<String, dynamic>);
  }

  /// Atualizar especialidades (vet)
  Future<UserModel> updateSpecialties(List<String> specialties) async {
    final response = await _apiClient.patch(
      '/vets/specialties',
      data: {'specialties': specialties},
    );
    return UserModel.fromJson(response.data as Map<String, dynamic>);
  }
}
