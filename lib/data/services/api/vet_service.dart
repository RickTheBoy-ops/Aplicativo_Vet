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
    final response = await _apiClient.get<Map<String, dynamic>>(
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

    if (response.data == null || response.data!['vets'] is! List) {
      throw Exception('Failed to search vets: invalid response format');
    }

    final data = response.data!['vets'] as List;
    return data.map((json) => UserModel.fromJson(json as Map<String, dynamic>)).toList();
  }

  /// Obter detalhes de um veterinário
  Future<UserModel> getVetById(String id) async {
    final response = await _apiClient.get<Map<String, dynamic>>('/vets/$id');
    if (response.data == null) {
      throw Exception('Failed to get vet details: no data received');
    }
    return UserModel.fromJson(response.data!);
  }

  /// Obter veterinários em destaque
  Future<List<UserModel>> getFeaturedVets({int limit = 10}) async {
    final response = await _apiClient.get<Map<String, dynamic>>(
      '/vets/featured',
      queryParameters: {'limit': limit},
    );

    if (response.data == null || response.data!['vets'] is! List) {
      throw Exception('Failed to get featured vets: invalid response format');
    }

    final data = response.data!['vets'] as List;
    return data.map((json) => UserModel.fromJson(json as Map<String, dynamic>)).toList();
  }

  /// Obter veterinários próximos
  Future<List<UserModel>> getNearbyVets({
    required double latitude,
    required double longitude,
    double radius = 10.0,
    int limit = 20,
  }) async {
    final response = await _apiClient.get<Map<String, dynamic>>(
      '/vets/nearby',
      queryParameters: {
        'latitude': latitude,
        'longitude': longitude,
        'radius': radius,
        'limit': limit,
      },
    );

    if (response.data == null || response.data!['vets'] is! List) {
      throw Exception('Failed to get nearby vets: invalid response format');
    }

    final data = response.data!['vets'] as List;
    return data.map((json) => UserModel.fromJson(json as Map<String, dynamic>)).toList();
  }

  /// Atualizar disponibilidade (vet)
  Future<UserModel> updateAvailability(bool isAvailable) async {
    final response = await _apiClient.patch<Map<String, dynamic>>(
      '/vets/availability',
      data: {'isAvailable': isAvailable},
    );
    if (response.data == null) {
      throw Exception('Failed to update availability: no data received');
    }
    return UserModel.fromJson(response.data!);
  }

  /// Atualizar localização (vet)
  Future<UserModel> updateLocation({
    required double latitude,
    required double longitude,
  }) async {
    final response = await _apiClient.patch<Map<String, dynamic>>(
      '/vets/location',
      data: {
        'latitude': latitude,
        'longitude': longitude,
      },
    );
    if (response.data == null) {
      throw Exception('Failed to update location: no data received');
    }
    return UserModel.fromJson(response.data!);
  }

  /// Atualizar especialidades (vet)
  Future<UserModel> updateSpecialties(List<String> specialties) async {
    final response = await _apiClient.patch<Map<String, dynamic>>(
      '/vets/specialties',
      data: {'specialties': specialties},
    );
    if (response.data == null) {
      throw Exception('Failed to update specialties: no data received');
    }
    return UserModel.fromJson(response.data!);
  }
}
