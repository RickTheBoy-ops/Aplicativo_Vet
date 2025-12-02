import 'dart:io';

import 'package:dio/dio.dart';

import '../../models/user_model.dart';
import 'api_client.dart';

class AuthService {
  AuthService({required ApiClient apiClient}) : _apiClient = apiClient;

  final ApiClient _apiClient;

  Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    try {
      final response = await _apiClient.post<Map<String, dynamic>>(
        '/auth/login',
        data: {'email': email, 'password': password},
      );
      final data = response.data!;
      return {
        'user': UserModel.fromJson(data['user'] as Map<String, dynamic>),
        'token': data['token'] as String,
      };
    } on DioException catch (e) {
      throw Exception(
        e.response?.data['message'] as String? ?? 'Erro ao fazer login',
      );
    }
  }

  Future<Map<String, dynamic>> register({
    required String name,
    required String email,
    required String password,
    required String userType,
    String? phone,
    String? cpf,
    String? crmv,
  }) async {
    try {
      final response = await _apiClient.post<Map<String, dynamic>>(
        '/auth/register',
        data: {
          'name': name,
          'email': email,
          'password': password,
          'userType': userType,
          'phone': phone,
          'cpf': cpf,
          'crmv': crmv,
        },
      );
      final data = response.data!;
      return {
        'user': UserModel.fromJson(data['user'] as Map<String, dynamic>),
        'token': data['token'] as String,
      };
    } on DioException catch (e) {
      throw Exception(
        e.response?.data['message'] as String? ?? 'Erro ao registrar',
      );
    }
  }

  Future<void> logout() async {
    try {
      await _apiClient.post<void>('/auth/logout');
    } on DioException catch (e) {
      throw Exception(
        e.response?.data['message'] as String? ?? 'Erro ao fazer logout',
      );
    }
  }

  Future<void> forgotPassword(String email) async {
    try {
      await _apiClient.post<void>(
        '/auth/forgot-password',
        data: {'email': email},
      );
    } on DioException catch (e) {
      throw Exception(
        e.response?.data['message'] as String? ?? 'Erro ao recuperar senha',
      );
    }
  }

  Future<UserModel> getCurrentUser() async {
    try {
      final response = await _apiClient.get<Map<String, dynamic>>('/user/me');
      return UserModel.fromJson(response.data!);
    } on DioException catch (e) {
      throw Exception(
        e.response?.data['message'] as String? ?? 'Erro ao carregar usuário',
      );
    }
  }

  Future<UserModel> updateProfile(Map<String, dynamic> data) async {
    try {
      final response = await _apiClient.put<Map<String, dynamic>>(
        '/user/profile',
        data: data,
      );
      return UserModel.fromJson(response.data!);
    } on DioException catch (e) {
      throw Exception(
        e.response?.data['message'] as String? ?? 'Erro ao atualizar perfil',
      );
    }
  }

  Future<String> uploadAvatar(String filePath) async {
    try {
      final file = File(filePath);
      final fileName = file.path.split('/').last;
      final formData = FormData.fromMap({
        'avatar': await MultipartFile.fromFile(
          file.path,
          filename: fileName,
        ),
      });

      final response = await _apiClient.post<Map<String, dynamic>>(
        '/user/avatar',
        data: formData,
      );
      final data = response.data!;
      return data['avatarUrl'] as String;
    } on DioException catch (e) {
      throw Exception(
        e.response?.data['message'] as String? ?? 'Erro ao enviar avatar',
      );
    }
  }
}
