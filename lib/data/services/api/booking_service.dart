import '../../models/booking_model.dart';
import 'api_client.dart';

/// Serviço de Agendamentos
class BookingService {
  final ApiClient _apiClient;

  BookingService({required ApiClient apiClient}) : _apiClient = apiClient;

  /// Criar novo agendamento
  Future<BookingModel> createBooking({
    required String vetId,
    required String animalId,
    required DateTime scheduledDate,
    String? description,
    String? address,
    double? latitude,
    double? longitude,
  }) async {
    final response = await _apiClient.post<Map<String, dynamic>>(
      '/bookings',
      data: {
        'vetId': vetId,
        'animalId': animalId,
        'scheduledDate': scheduledDate.toIso8601String(),
        if (description != null) 'description': description,
        if (address != null) 'address': address,
        if (latitude != null) 'latitude': latitude,
        if (longitude != null) 'longitude': longitude,
      },
    );

    if (response.data == null) {
      throw Exception('Failed to create booking: no data received');
    }
    return BookingModel.fromJson(response.data!);
  }

  /// Listar agendamentos do proprietário
  Future<List<BookingModel>> getOwnerBookings({
    String? status,
    int page = 1,
    int limit = 20,
  }) async {
    final response = await _apiClient.get<Map<String, dynamic>>(
      '/bookings/owner',
      queryParameters: {
        if (status != null) 'status': status,
        'page': page,
        'limit': limit,
      },
    );

    if (response.data == null || response.data!['bookings'] is! List) {
      throw Exception('Failed to load bookings: invalid response format');
    }

    final data = response.data!['bookings'] as List;
    return data.map((json) => BookingModel.fromJson(json as Map<String, dynamic>)).toList();
  }

  /// Listar agendamentos do veterinário
  Future<List<BookingModel>> getVetBookings({
    String? status,
    DateTime? date,
    int page = 1,
    int limit = 20,
  }) async {
    final response = await _apiClient.get<Map<String, dynamic>>(
      '/bookings/vet',
      queryParameters: {
        if (status != null) 'status': status,
        if (date != null) 'date': date.toIso8601String().split('T')[0],
        'page': page,
        'limit': limit,
      },
    );

    if (response.data == null || response.data!['bookings'] is! List) {
      throw Exception('Failed to load bookings: invalid response format');
    }

    final data = response.data!['bookings'] as List;
    return data.map((json) => BookingModel.fromJson(json as Map<String, dynamic>)).toList();
  }

  /// Obter detalhes de um agendamento
  Future<BookingModel> getBookingById(String id) async {
    final response = await _apiClient.get<Map<String, dynamic>>('/bookings/$id');
    if (response.data == null) {
      throw Exception('Failed to get booking details: no data received');
    }
    return BookingModel.fromJson(response.data!);
  }

  /// Cancelar agendamento
  Future<BookingModel> cancelBooking(String id, String reason) async {
    final response = await _apiClient.patch<Map<String, dynamic>>(
      '/bookings/$id/cancel',
      data: {'reason': reason},
    );
    if (response.data == null) {
      throw Exception('Failed to cancel booking: no data received');
    }
    return BookingModel.fromJson(response.data!);
  }

  /// Confirmar agendamento (vet)
  Future<BookingModel> confirmBooking(String id) async {
    final response = await _apiClient.patch<Map<String, dynamic>>('/bookings/$id/confirm');
    if (response.data == null) {
      throw Exception('Failed to confirm booking: no data received');
    }
    return BookingModel.fromJson(response.data!);
  }

  /// Iniciar atendimento (vet)
  Future<BookingModel> startBooking(String id) async {
    final response = await _apiClient.patch<Map<String, dynamic>>('/bookings/$id/start');
    if (response.data == null) {
      throw Exception('Failed to start booking: no data received');
    }
    return BookingModel.fromJson(response.data!);
  }

  /// Completar atendimento (vet)
  Future<BookingModel> completeBooking(String id, {String? notes}) async {
    final response = await _apiClient.patch<Map<String, dynamic>>(
      '/bookings/$id/complete',
      data: notes != null ? {'notes': notes} : {},
    );
    if (response.data == null) {
      throw Exception('Failed to complete booking: no data received');
    }
    return BookingModel.fromJson(response.data!);
  }
}
