import 'dart:async';

import 'package:flutter/foundation.dart';
import '../data/models/user_model.dart';
import '../data/services/api/api_client.dart';
import '../data/services/api/auth_service.dart';

/// Provider para gerenciar estado de autenticação
class AuthProvider extends ChangeNotifier {

  AuthProvider({AuthService? authService})
      : _authService =
            authService ?? AuthService(apiClient: ApiClient());
  final AuthService _authService;

  UserModel? _user;
  bool _isAuthenticated = false;
  bool _isLoading = false;
  String? _error;

  // Getters
  UserModel? get user => _user;
  bool get isAuthenticated => _isAuthenticated;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isOwner => _user?.isOwner ?? false;
  bool get isVet => _user?.isVet ?? false;

  /// Executa uma ação de autenticação, gerenciando estado de loading e erros.
  Future<bool> _executeAuthAction(Future<UserModel?> Function() action) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final user = await action();
      if (user != null) {
        _user = user;
        _isAuthenticated = true;
      }
      return true;
    } on Exception catch (e) {
      _error = e.toString();
      _isAuthenticated = false;
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  /// Login
  Future<bool> login({
    required String email,
    required String password,
  }) async {
    return _executeAuthAction(() async {
      final result = await _authService.login(email: email, password: password);
      return result['user'] as UserModel;
    });
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
    return _executeAuthAction(() async {
      final result = await _authService.register(
        name: name,
        email: email,
        password: password,
        userType: userType,
        phone: phone,
        cpf: cpf,
        crmv: crmv,
      );
      return result['user'] as UserModel;
    });
  }

  /// Logout
  Future<void> logout() async {
    _isLoading = true;
    notifyListeners();

    try {
      await _authService.logout();
    } on Exception catch (e) {
      _error = e.toString();
    } finally {
      _user = null;
      _isAuthenticated = false;
      _isLoading = false;
      notifyListeners();
    }
  }

  /// Recuperar senha
  Future<bool> forgotPassword(String email) async {
    return _executeAuthAction(() async {
      await _authService.forgotPassword(email);
      return null; // Ação não retorna um usuário
    });
  }

  /// Carregar usuário atual
  Future<bool> loadCurrentUser() async {
    // Ação especial: reverte estado em caso de falha
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _user = await _authService.getCurrentUser();
      _isAuthenticated = true;
      return true;
    } on Exception catch (e) {
      _error = e.toString();
      _isAuthenticated = false;
      _user = null;
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  /// Atualizar perfil
  Future<bool> updateProfile(Map<String, dynamic> data) async {
    return _executeAuthAction(() => _authService.updateProfile(data));
  }

  /// Upload de avatar
  Future<bool> uploadAvatar(String filePath) async {
    return _executeAuthAction(() async {
      final avatarUrl = await _authService.uploadAvatar(filePath);
      return _user?.copyWith(avatarUrl: avatarUrl);
    });
  }

  /// Limpar erro
  void clearError() {
    _error = null;
    notifyListeners();
  }
}
