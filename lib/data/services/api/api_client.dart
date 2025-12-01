import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:logger/logger.dart';
import '../../core/config/app_config.dart';

/// Cliente HTTP configurado com Dio
/// Gerencia todas as chamadas HTTP da aplicação
class ApiClient {
  late final Dio _dio;
  final FlutterSecureStorage _secureStorage;
  final Logger _logger = Logger();
  
  String? _authToken;

  ApiClient({FlutterSecureStorage? secureStorage})
      : _secureStorage = secureStorage ?? const FlutterSecureStorage() {
    _dio = Dio(
      BaseOptions(
        baseUrl: AppConfig.apiUrl,
        connectTimeout: const Duration(seconds: 30),
        receiveTimeout: const Duration(seconds: 30),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );

    _setupInterceptors();
  }

  /// Configura interceptors para logging, autenticação e tratamento de erros
  void _setupInterceptors() {
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          // Add auth token if available
          if (_authToken != null) {
            options.headers['Authorization'] = 'Bearer $_authToken';
          } else {
            // Try to load token from secure storage
            final token = await _secureStorage.read(key: AppConfig.tokenKey);
            if (token != null) {
              _authToken = token;
              options.headers['Authorization'] = 'Bearer $token';
            }
          }

          _logger.d('REQUEST[${options.method}] => PATH: ${options.path}');
          return handler.next(options);
        },
        onResponse: (response, handler) {
          _logger.d(
            'RESPONSE[${response.statusCode}] => PATH: ${response.requestOptions.path}',
          );
          return handler.next(response);
        },
        onError: (error, handler) async {
          _logger.e(
            'ERROR[${error.response?.statusCode}] => PATH: ${error.requestOptions.path}',
          );

          // Handle 401 Unauthorized - try to refresh token
          if (error.response?.statusCode == 401) {
            final success = await _refreshToken();
            if (success) {
              // Retry the original request
              final options = error.requestOptions;
              options.headers['Authorization'] = 'Bearer $_authToken';
              try {
                final response = await _dio.request(
                  options.path,
                  data: options.data,
                  queryParameters: options.queryParameters,
                  options: Options(
                    method: options.method,
                    headers: options.headers,
                  ),
                );
                return handler.resolve(response);
              } catch (e) {
                return handler.next(error);
              }
            }
          }

          return handler.next(error);
        },
      ),
    );
  }

  /// Tenta renovar o token de autenticação
  Future<bool> _refreshToken() async {
    try {
      final refreshToken = await _secureStorage.read(
        key: AppConfig.refreshTokenKey,
      );
      
      if (refreshToken == null) return false;

      final response = await _dio.post(
        '/auth/refresh',
        data: {'refreshToken': refreshToken},
      );

      if (response.statusCode == 200) {
        final newToken = response.data['token'] as String;
        final newRefreshToken = response.data['refreshToken'] as String;

        await saveToken(newToken);
        await saveRefreshToken(newRefreshToken);
        _authToken = newToken;

        return true;
      }

      return false;
    } catch (e) {
      _logger.e('Error refreshing token: $e');
      return false;
    }
  }

  /// Salva o token de autenticação
  Future<void> saveToken(String token) async {
    _authToken = token;
    await _secureStorage.write(key: AppConfig.tokenKey, value: token);
  }

  /// Salva o refresh token
  Future<void> saveRefreshToken(String refreshToken) async {
    await _secureStorage.write(
      key: AppConfig.refreshTokenKey,
      value: refreshToken,
    );
  }

  /// Remove o token (logout)
  Future<void> clearToken() async {
    _authToken = null;
    await _secureStorage.delete(key: AppConfig.tokenKey);
    await _secureStorage.delete(key: AppConfig.refreshTokenKey);
  }

  /// GET Request
  Future<Response> get(
    String path, {
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async {
    try {
      return await _dio.get(
        path,
        queryParameters: queryParameters,
        options: options,
      );
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  /// POST Request
  Future<Response> post(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async {
    try {
      return await _dio.post(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
      );
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  /// PUT Request
  Future<Response> put(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async {
    try {
      return await _dio.put(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
      );
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  /// DELETE Request
  Future<Response> delete(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async {
    try {
      return await _dio.delete(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
      );
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  /// PATCH Request
  Future<Response> patch(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async {
    try {
      return await _dio.patch(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
      );
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  /// Upload de arquivo
  Future<Response> uploadFile(
    String path,
    String filePath, {
    String fileKey = 'file',
    Map<String, dynamic>? data,
    ProgressCallback? onProgress,
  }) async {
    try {
      final formData = FormData.fromMap({
        fileKey: await MultipartFile.fromFile(filePath),
        if (data != null) ...data,
      });

      return await _dio.post(
        path,
        data: formData,
        onSendProgress: onProgress,
      );
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  /// Trata erros do Dio
  Exception _handleError(DioException error) {
    switch (error.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
        return TimeoutException('Tempo esgotado. Tente novamente.');
      
      case DioExceptionType.badResponse:
        final statusCode = error.response?.statusCode;
        final message = error.response?.data['message'] as String?;
        
        switch (statusCode) {
          case 400:
            return BadRequestException(message ?? 'Requisição inválida');
          case 401:
            return UnauthorizedException(message ?? 'Não autorizado');
          case 403:
            return ForbiddenException(message ?? 'Acesso negado');
          case 404:
            return NotFoundException(message ?? 'Recurso não encontrado');
          case 500:
          case 502:
          case 503:
            return ServerException(message ?? 'Erro no servidor');
          default:
            return HttpException(message ?? 'Erro na requisição', statusCode);
        }
      
      case DioExceptionType.cancel:
        return RequestCancelledException('Requisição cancelada');
      
      case DioExceptionType.unknown:
      default:
        if (error.error.toString().contains('SocketException')) {
          return NetworkException('Sem conexão com a internet');
        }
        return UnknownException('Erro desconhecido: ${error.message}');
    }
  }
}

// ===== Custom Exceptions =====

class TimeoutException implements Exception {
  final String message;
  TimeoutException(this.message);
  @override
  String toString() => message;
}

class BadRequestException implements Exception {
  final String message;
  BadRequestException(this.message);
  @override
  String toString() => message;
}

class UnauthorizedException implements Exception {
  final String message;
  UnauthorizedException(this.message);
  @override
  String toString() => message;
}

class ForbiddenException implements Exception {
  final String message;
  ForbiddenException(this.message);
  @override
  String toString() => message;
}

class NotFoundException implements Exception {
  final String message;
  NotFoundException(this.message);
  @override
  String toString() => message;
}

class ServerException implements Exception {
  final String message;
  ServerException(this.message);
  @override
  String toString() => message;
}

class RequestCancelledException implements Exception {
  final String message;
  RequestCancelledException(this.message);
  @override
  String toString() => message;
}

class NetworkException implements Exception {
  final String message;
  NetworkException(this.message);
  @override
  String toString() => message;
}

class HttpException implements Exception {
  final String message;
  final int? statusCode;
  HttpException(this.message, this.statusCode);
  @override
  String toString() => 'HTTP $statusCode: $message';
}

class UnknownException implements Exception {
  final String message;
  UnknownException(this.message);
  @override
  String toString() => message;
}
