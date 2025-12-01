import '../models/booking_model.dart';
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
    final response = await _apiClient.post(
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

    return BookingModel.fromJson(response.data as Map<String, dynamic>);
  }

  /// Listar agendamentos do proprietário
  Future<List<BookingModel>> getOwnerBookings({
    String? status,
    int page = 1,
    int limit = 20,
  }) async {
    final response = await _apiClient.get(
      '/bookings/owner',
      queryParameters: {
        if (status != null) 'status': status,
        'page': page,
        'limit': limit,
      },
    );

    final data = response.data['bookings'] as List;
    return data.map((json) => BookingModel.fromJson(json)).toList();
  }

  /// Listar agendamentos do veterinário
  Future<List<BookingModel>> getVetBookings({
    String? status,
    DateTime? date,
    int page = 1,
    int limit = 20,
  }) async {
    final response = await _apiClient.get(
      '/bookings/vet',
      queryParameters: {
        if (status != null) 'status': status,
        if (date != null) 'date': date.toIso8601String().split('T')[0],
        'page': page,
        'limit': limit,
      },
    );

    final data = response.data['bookings'] as List;
    return data.map((json) => BookingModel.fromJson(json)).toList();
  }

  /// Obter detalhes de um agendamento
  Future<BookingModel> getBookingById(String id) async {
    final response = await _apiClient.get('/bookings/$id');
    return BookingModel.fromJson(response.data as Map<String, dynamic>);
  }

  /// Cancelar agendamento
  Future<BookingModel> cancelBooking(String id, String reason) async {
    final response = await _apiClient.patch(
      '/bookings/$id/cancel',
      data: {'reason': reason},
    );
    return BookingModel.fromJson(response.data as Map<String, dynamic>);
  }

  /// Confirmar agendamento (vet)
  Future<BookingModel> confirmBooking(String id) async {
    final response = await _apiClient.patch('/bookings/$id/confirm');
    return BookingModel.fromJson(response.data as Map<String, dynamic>);
  }

  /// Iniciar atendimento (vet)
  Future<BookingModel> startBooking(String id) async {
    final response = await _apiClient.patch('/bookings/$id/start');
    return BookingModel.fromJson(response.data as Map<String, dynamic>);
  }

  /// Completar atendimento (vet)
  Future<BookingModel> completeBooking(String id, {String? notes}) async {
    final response = await _apiClient.patch(
      '/bookings/$id/complete',
      data: if (notes != null) {'notes': notes},
    );
    return BookingModel.fromJson(response.data as Map<String, dynamic>);
  }
}
