import 'package:flutter/foundation.dart';
import '../data/models/booking_model.dart';
import '../data/services/api/api_client.dart';
import '../data/services/api/booking_service.dart';

/// Provider para gerenciar estado de agendamentos
class BookingProvider extends ChangeNotifier {
  final BookingService _bookingService;

  List<BookingModel> _bookings = [];
  BookingModel? _selectedBooking;
  bool _isLoading = false;
  String? _error;

  BookingProvider({BookingService? bookingService})
      : _bookingService =
            bookingService ?? BookingService(apiClient: ApiClient());

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
    _setLoading(true);
    _error = null;

    try {
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
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  /// Carregar agendamentos do proprietário
  Future<void> loadOwnerBookings({String? status}) async {
    _setLoading(true);
    _error = null;

    try {
      _bookings = await _bookingService.getOwnerBookings(status: status);
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  /// Carregar agendamentos do veterinário
  Future<void> loadVetBookings({
    String? status,
    DateTime? date,
  }) async {
    _setLoading(true);
    _error = null;

    try {
      _bookings = await _bookingService.getVetBookings(
        status: status,
        date: date,
      );
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  /// Selecionar um agendamento
  Future<void> selectBooking(String id) async {
    _setLoading(true);
    _error = null;

    try {
      _selectedBooking = await _bookingService.getBookingById(id);
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  /// Cancelar agendamento
  Future<bool> cancelBooking(String id, String reason) async {
    _setLoading(true);
    _error = null;

    try {
      final updatedBooking = await _bookingService.cancelBooking(id, reason);

      // Update in list
      final index = _bookings.indexWhere((b) => b.id == id);
      if (index != -1) {
        _bookings[index] = updatedBooking;
      }

      if (_selectedBooking?.id == id) {
        _selectedBooking = updatedBooking;
      }

      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  /// Confirmar agendamento (vet)
  Future<bool> confirmBooking(String id) async {
    _setLoading(true);
    _error = null;

    try {
      final updatedBooking = await _bookingService.confirmBooking(id);
      _updateBookingInList(updatedBooking);
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  /// Iniciar atendimento (vet)
  Future<bool> startBooking(String id) async {
    _setLoading(true);
    _error = null;

    try {
      final updatedBooking = await _bookingService.startBooking(id);
      _updateBookingInList(updatedBooking);
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  /// Completar atendimento (vet)
  Future<bool> completeBooking(String id, {String? notes}) async {
    _setLoading(true);
    _error = null;

    try {
      final updatedBooking = await _bookingService.completeBooking(
        id,
        notes: notes,
      );
      _updateBookingInList(updatedBooking);
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
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

  void _updateBookingInList(BookingModel updatedBooking) {
    final index = _bookings.indexWhere((b) => b.id == updatedBooking.id);
    if (index != -1) {
      _bookings[index] = updatedBooking;
    }

    if (_selectedBooking?.id == updatedBooking.id) {
      _selectedBooking = updatedBooking;
    }
  }

  void _setLoading(bool value) {
    _isLoading = value;
    notifyListeners();
  }
}
