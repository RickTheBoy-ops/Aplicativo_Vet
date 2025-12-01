import 'package:flutter/foundation.dart';
import '../data/models/user_model.dart';
import '../data/services/api/api_client.dart';
import '../data/services/api/auth_service.dart';

/// Provider para gerenciar estado de autenticação
class AuthProvider extends ChangeNotifier {
  final AuthService _authService;
  
  UserModel? _user;
  bool _isAuthenticated = false;
  bool _isLoading = false;
  String? _error;

  AuthProvider({AuthService? authService})
      : _authService = authService ?? AuthService(apiClient: ApiClient());

  // Getters
  UserModel? get user => _user;
  bool get isAuthenticated => _isAuthenticated;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isOwner => _user?.isOwner ?? false;
  bool get isVet => _user?.isVet ?? false;

  /// Login
  Future<bool> login({
    required String email,
    required String password,
  }) async {
    _setLoading(true);
    _error = null;

    try {
      final result = await _authService.login(
        email: email,
        password: password,
      );

      _user = result['user'] as UserModel;
      _isAuthenticated = true;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isAuthenticated = false;
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  /// Registro
  Future<bool> register({
    required String name,
    required String email,
    required String password,
    required String userType,
    String? phone,
    String? cpf,
    String? crmv,
  }) async {
    _setLoading(true);
    _error = null;

    try {
      final result = await _authService.register(
        name: name,
        email: email,
        password: password,
        userType: userType,
        phone: phone,
        cpf: cpf,
        crmv: crmv,
      );

      _user = result['user'] as UserModel;
      _isAuthenticated = true;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isAuthenticated = false;
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  /// Logout
  Future<void> logout() async {
    _setLoading(true);
    
    try {
      await _authService.logout();
    } catch (e) {
      _error = e.toString();
    } finally {
      _user = null;
      _isAuthenticated = false;
      _setLoading(false);
      notifyListeners();
    }
  }

  /// Recuperar senha
  Future<bool> forgotPassword(String email) async {
    _setLoading(true);
    _error = null;

    try {
      await _authService.forgotPassword(email);
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

  /// Carregar usuário atual
  Future<bool> loadCurrentUser() async {
    _setLoading(true);
    _error = null;

    try {
      _user = await _authService.getCurrentUser();
      _isAuthenticated = true;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isAuthenticated = false;
      _user = null;
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  /// Atualizar perfil
  Future<bool> updateProfile(Map<String, dynamic> data) async {
    _setLoading(true);
    _error =null;

    try {
      _user = await _authService.updateProfile(data);
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

  /// Upload de avatar
  Future<bool> uploadAvatar(String filePath) async {
    _setLoading(true);
    _error = null;

    try {
      final avatarUrl = await _authService.uploadAvatar(filePath);
      _user = _user?.copyWith(avatarUrl: avatarUrl);
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
