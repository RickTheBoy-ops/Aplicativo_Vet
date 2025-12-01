import '../models/user_model.dart';
import 'api_client.dart';

/// Serviço de Autenticação
class AuthService {
  final ApiClient _apiClient;

  AuthService({required ApiClient apiClient}) : _apiClient = apiClient;

  /// Login com email e senha
  Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    final response = await _apiClient.post(
      '/auth/login',
      data: {
        'email': email,
        'password': password,
      },
    );

    final data = response.data as Map<String, dynamic>;
    final token = data['token'] as String;
    final refreshToken = data['refreshToken'] as String;
    final user = UserModel.fromJson(data['user'] as Map<String, dynamic>);

    // Save token
    await _apiClient.saveToken(token);
    await _apiClient.saveRefreshToken(refreshToken);

    return {
      'token': token,
      'refreshToken': refreshToken,
      'user': user,
    };
  }

  /// Registro de novo usuário
  Future<Map<String, dynamic>> register({
    required String name,
    required String email,
    required String password,
    required String userType,
    String? phone,
    String? cpf,
    String? crmv,
  }) async {
    final response = await _apiClient.post(
      '/auth/register',
      data: {
        'name': name,
        'email': email,
        'password': password,
        'userType': userType,
        if (phone != null) 'phone': phone,
        if (cpf != null) 'cpf': cpf,
        if (crmv != null) 'crmv': crmv,
      },
    );

    final data = response.data as Map<String, dynamic>;
    final token = data['token'] as String;
    final refreshToken = data['refreshToken'] as String;
    final user = UserModel.fromJson(data['user'] as Map<String, dynamic>);

    await _apiClient.saveToken(token);
    await _apiClient.saveRefreshToken(refreshToken);

    return {
      'token': token,
      'refreshToken': refreshToken,
      'user': user,
    };
  }

  /// Logout
  Future<void> logout() async {
    try {
      await _apiClient.post('/auth/logout');
    } finally {
      await _apiClient.clearToken();
    }
  }

  /// Recuperar senha
  Future<void> forgotPassword(String email) async {
    await _apiClient.post(
      '/auth/forgot-password',
      data: {'email': email},
    );
  }

  /// Resetar senha
  Future<void> resetPassword({
    required String token,
    required String newPassword,
  }) async {
    await _apiClient.post(
      '/auth/reset-password',
      data: {
        'token': token,
        'newPassword': newPassword,
      },
    );
  }

  /// Obter perfil do usuário atual
  Future<UserModel> getCurrentUser() async {
    final response = await _apiClient.get('/auth/me');
    return UserModel.fromJson(response.data as Map<String, dynamic>);
  }

  /// Atualizar perfil
  Future<UserModel> updateProfile(Map<String, dynamic> data) async {
    final response = await _apiClient.put('/auth/profile', data: data);
    return UserModel.fromJson(response.data as Map<String, dynamic>);
  }

  /// Atualizar avatar
  Future<String> uploadAvatar(String filePath) async {
    final response = await _apiClient.uploadFile(
      '/auth/avatar',
      filePath,
      fileKey: 'avatar',
    );
    return response.data['avatarUrl'] as String;
  }
}
