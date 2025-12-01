/// App Configuration
/// Centraliza as configurações do aplicativo
class AppConfig {
  AppConfig._();

  // API Configuration
  static const String apiUrl = String.fromEnvironment(
    'API_URL',
    defaultValue: 'http://localhost:3000/api',
  );

  static const String apiTimeout = '30000'; // 30 seconds

  // Google Maps API Keys
  static const String googleMapsApiKeyAndroid = String.fromEnvironment(
    'GOOGLE_MAPS_API_KEY_ANDROID',
    defaultValue: '',
  );

  static const String googleMapsApiKeyIOS = String.fromEnvironment(
    'GOOGLE_MAPS_API_KEY_IOS',
    defaultValue: '',
  );

  // App Info
  static const String appName = 'VetField';
  static const String appVersion = '1.0.0';
  static const String appBuildNumber = '1';

  // Feature Flags
  static const bool enableAnalytics = bool.fromEnvironment(
    'ENABLE_ANALYTICS',
    defaultValue: false,
  );

  static const bool enableCrashReporting = bool.fromEnvironment(
    'ENABLE_CRASH_REPORTING',
    defaultValue: false,
  );

  // Storage Keys
  static const String tokenKey = 'auth_token';
  static const String refreshTokenKey = 'refresh_token';
  static const String userKey = 'user_data';
  static const String themeKey = 'theme_mode';
  static const String languageKey = 'language';

  // Pagination
  static const int defaultPageSize = 20;
  static const int maxPageSize = 100;

  // Map Configuration
  static const double defaultZoom = 15.0;
  static const double defaultLatitude = -23.5505;
  static const double defaultLongitude = -46.6333; // São Paulo

  // Search Configuration
  static const int searchDebounceMs = 500;
  static const int minSearchLength = 3;

  // Cache Configuration
  static const Duration cacheExpiration = Duration(hours: 24);
  static const int maxCacheSize = 100;

  // Validation
  static const int minPasswordLength = 8;
  static const int maxPasswordLength = 50;
  static const int maxNameLength = 100;
  static const int maxBioLength = 500;

  // File Upload
  static const int maxImageSizeMB = 5;
  static const List<String> allowedImageExtensions = ['jpg', 'jpeg', 'png'];

  // Subscription Plans
  static const String freePlanId = 'free';
  static const String basicPlanId = 'basic';
  static const String premiumPlanId = 'premium';
}
