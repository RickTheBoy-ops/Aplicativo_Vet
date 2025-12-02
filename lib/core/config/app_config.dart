class AppConfig {
  const AppConfig._();

  static const String env = String.fromEnvironment(
    'APP_ENV',
    defaultValue: 'development',
  );
  static const String apiUrl = String.fromEnvironment(
    'API_URL',
    defaultValue: 'http://localhost:3000/api',
  );
  static const String tokenKey = 'auth_token';
  static const String refreshTokenKey = 'refresh_token';

  static bool get isDev => env == 'development';
  static bool get isTest => env == 'test';
  static bool get isProd => env == 'production';
}
