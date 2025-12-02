import 'package:flutter/foundation.dart';
import '../data/models/booking_model.dart';
import '../data/services/api/api_client.dart';
import '../data/services/api/booking_service.dart';

/// Provider para gerenciar estado de agendamentos
class BookingProvider extends ChangeNotifier {

  BookingProvider({BookingService? bookingService})
      : _bookingService =
            bookingService ?? BookingService(apiClient: ApiClient());
  final BookingService _bookingService;

  List<BookingModel> _bookings = [];
  BookingModel? _selectedBooking;
  bool _isLoading = false;
  String? _error;

  // Getters
  List<BookingModel> get bookings => _bookings;
  BookingModel? get selectedBooking => _selectedBooking;
  bool get isLoading => _isLoading;
  String? get error => _error;

  // Filtered lists
  List<BookingModel> get pendingBookings =>
      _bookings.where((b) => b.isPending).toList();

  List<BookingModel> get confirmedBookings =>
      _bookings.where((b) => b.isConfirmed).toList();

  List<BookingModel> get activeBookings =>
      _bookings.where((b) => b.isActive).toList();

  List<BookingModel> get completedBookings =>
      _bookings.where((b) => b.isCompleted).toList();

  List<BookingModel> get cancelledBookings =>
      _bookings.where((b) => b.isCancelled).toList();

  /// Executa uma ação, gerenciando o estado de loading, erros e notificando os ouvintes.
  Future<bool> _executeAction(Future<void> Function() action) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    bool success = false;
    try {
      await action();
      success = true;
    } on Exception catch (e) {
      _error = e.toString();
      success = false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
    return success;
  }

  /// Criar novo agendamento
  Future<bool> createBooking({
    required String vetId,
    required String animalId,
    required DateTime scheduledDate,
    String? description,
    String? address,
    double? latitude,
    double? longitude,
  }) async {
    return _executeAction(() async {
      final booking = await _bookingService.createBooking(
        vetId: vetId,
        animalId: animalId,
        scheduledDate: scheduledDate,
        description: description,
        address: address,
        latitude: latitude,
        longitude: longitude,
      );
      _bookings.insert(0, booking);
      _selectedBooking = booking;
    });
  }

  /// Carregar agendamentos do proprietário
  Future<void> loadOwnerBookings({String? status}) async {
    await _executeAction(() async {
      _bookings = await _bookingService.getOwnerBookings(status: status);
    });
  }

  /// Carregar agendamentos do veterinário
  Future<void> loadVetBookings({
    String? status,
    DateTime? date,
  }) async {
    await _executeAction(() async {
      _bookings = await _bookingService.getVetBookings(
        status: status,
        date: date,
      );
    });
  }

  /// Selecionar um agendamento
  Future<void> selectBooking(String id) async {
    await _executeAction(() async {
      _selectedBooking = await _bookingService.getBookingById(id);
    });
  }

  /// Atualiza um agendamento na lista e na seleção atual.
  void _updateBookingInList(BookingModel updatedBooking) {
    final index = _bookings.indexWhere((b) => b.id == updatedBooking.id);
    if (index != -1) {
      _bookings[index] = updatedBooking;
    }

    if (_selectedBooking?.id == updatedBooking.id) {
      _selectedBooking = updatedBooking;
    }
  }

  /// Ação genérica para atualizar o status de um agendamento.
  Future<bool> _updateBookingStatus(String id, Future<BookingModel> Function() updateFunction) async {
    return _executeAction(() async {
      final updatedBooking = await updateFunction();
      _updateBookingInList(updatedBooking);
    });
  }

  /// Cancelar agendamento
  Future<bool> cancelBooking(String id, String reason) async {
    return _updateBookingStatus(id, () => _bookingService.cancelBooking(id, reason));
  }

  /// Confirmar agendamento (vet)
  Future<bool> confirmBooking(String id) async {
    return _updateBookingStatus(id, () => _bookingService.confirmBooking(id));
  }

  /// Iniciar atendimento (vet)
  Future<bool> startBooking(String id) async {
    return _updateBookingStatus(id, () => _bookingService.startBooking(id));
  }

  /// Completar atendimento (vet)
  Future<bool> completeBooking(String id, {String? notes}) async {
    return _updateBookingStatus(id, () => _bookingService.completeBooking(id, notes: notes));
  }

  /// Limpar seleção
  void clearSelection() {
    _selectedBooking = null;
    notifyListeners();
  }

  /// Limpar erro
  void clearError() {
    _error = null;
    notifyListeners();
  }
}
