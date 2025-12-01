import 'package:flutter/material.dart';

/// Design System - Cores do VetField
/// Baseado no design system do React Native original
class AppColors {
  // Private constructor to prevent instantiation
  AppColors._();

  // ===== Primary Colors =====
  static const Color primary = Color(0xFF2180CD);
  static const Color primaryLight = Color(0xFF4A9DE5);
  static const Color primaryDark = Color(0xFF1565B3);

  // ===== Secondary Colors =====
  static const Color secondary = Color(0xFF5E5240);
  static const Color secondaryLight = Color(0xFF7B6E5D);
  static const Color secondaryDark = Color(0xFF3D3529);

  // ===== Status Colors =====
  static const Color success = Color(0xFF218C8D);
  static const Color successLight = Color(0xFF3BAAAB);
  static const Color successDark = Color(0xFF176F70);

  static const Color error = Color(0xFFC0152F);
  static const Color errorLight = Color(0xFFD13D52);
  static const Color errorDark = Color(0xFF8F0F23);

  static const Color warning = Color(0xFFA84B2F);
  static const Color warningLight = Color(0xFFC16D4F);
  static const Color warningDark = Color(0xFF7D3723);

  static const Color info = Color(0xFF2180CD);
  static const Color infoLight = Color(0xFF4A9DE5);
  static const Color infoDark = Color(0xFF1565B3);

  // ===== Background Colors =====
  static const Color background = Color(0xFFFFFBF9);
  static const Color surface = Color(0xFFFFFFF5);
  static const Color surfaceLight = Color(0xFFFFFFFF);
  static const Color surfaceDark = Color(0xFFF5F1EF);

  // ===== Text Colors =====
  static const Color text = Color(0xFF133452);
  static const Color textSecondary = Color(0xFF62726D);
  static const Color textLight = Color(0xFF8A9A95);
  static const Color textDisabled = Color(0xFFC4CBC8);

  // ===== Border Colors =====
  static const Color border = Color(0xFFE0E5E3);
  static const Color borderLight = Color(0xFFF0F3F2);
  static const Color borderDark = Color(0xFFB8BFBC);

  // ===== Overlay Colors =====
  static const Color overlay = Color(0x80133452); // rgba(19, 52, 82, 0.5)
  static const Color overlayLight = Color(0x4D133452); // rgba(19, 52, 82, 0.3)
  static const Color overlayDark = Color(0xB3133452); // rgba(19, 52, 82, 0.7)

  // ===== White & Black =====
  static const Color white = Color(0xFFFFFFFF);
  static const Color black = Color(0xFF000000);

  // ===== Transparent =====
  static const Color transparent = Colors.transparent;

  // ===== Gradients =====
  static const List<Color> primaryGradient = [primary, primaryDark];
  static const List<Color> primaryGradientReverse = [primaryDark, primary];
  
  static const List<Color> successGradient = [success, successDark];
  static const List<Color> successGradientReverse = [successDark, success];
  
  static const List<Color> heroGradient = [primary, success];
  static const List<Color> heroGradientReverse = [success, primary];
  
  static const List<Color> sunsetGradient = [warning, error];
  
  static const List<Color> softBlue = [primaryLight, primary, primaryDark];
  static const List<Color> softGreen = [successLight, success, successDark];

  // ===== Glassmorphism =====
  static const Color glassLight = Color(0xB3FFFFFF); // rgba(255, 255, 255, 0.7)
  static const Color glassLightMedium = Color(0x80FFFFFF); // rgba(255, 255, 255, 0.5)
  static const Color glassLightSoft = Color(0x4D FFFFFF); // rgba(255, 255, 255, 0.3)

  static const Color glassDark = Color(0x33133452); // rgba(19, 52, 82, 0.2)
  static const Color glassDarkMedium = Color(0x26133452); // rgba(19, 52, 82, 0.15)
  static const Color glassDarkSoft = Color(0x14133452); // rgba(19, 52, 82, 0.08)

  static const Color glassPrimaryLight = Color(0x262180CD); // rgba(33, 128, 205, 0.15)
  static const Color glassPrimaryMedium = Color(0x402180CD); // rgba(33, 128, 205, 0.25)
  static const Color glassPrimaryStrong = Color(0x662180CD); // rgba(33, 128, 205, 0.4)

  static const Color glassSuccessLight = Color(0x26218C8D); // rgba(33, 140, 141, 0.15)
  static const Color glassSuccessMedium = Color(0x40218C8D); // rgba(33, 140, 141, 0.25)
  static const Color glassSuccessStrong = Color(0x66218C8D); // rgba(33, 140, 141, 0.4)

  // ===== Shadow Colors =====
  static const Color shadowSm = Color(0x14133452); // rgba(19, 52, 82, 0.08)
  static const Color shadowMd = Color(0x1F133452); // rgba(19, 52, 82, 0.12)
  static const Color shadowLg = Color(0x29133452); // rgba(19, 52, 82, 0.16)
  static const Color shadowXl = Color(0x33133452); // rgba(19, 52, 82, 0.20)
  static const Color shadow2xl = Color(0x3D133452); // rgba(19, 52, 82, 0.24)

  // ===== Accent Colors =====
  static const Color accentBlue = Color(0xFF2180CD);
  static const Color accentGreen = Color(0xFF218C8D);
  static const Color accentOrange = Color(0xFFA84B2F);
  static const Color accentRed = Color(0xFFC0152F);
  static const Color accentPurple = Color(0xFF7B4397);
  static const Color accentPink = Color(0xFFD83A6E);
  static const Color accentYellow = Color(0xFFF4A261);
  static const Color accentTeal = Color(0xFF2A9D8F);

  // ===== State Colors =====
  static const Color stateHover = Color(0x142180CD); // rgba(33, 128, 205, 0.08)
  static const Color statePressed = Color(0x1F2180CD); // rgba(33, 128, 205, 0.12)
  static const Color stateFocus = Color(0x292180CD); // rgba(33, 128, 205, 0.16)
  static const Color stateDisabled = Color(0x0D133452); // rgba(19, 52, 82, 0.05)

  // ===== Helper Methods =====
  
  /// Returns a LinearGradient with specified colors
  static LinearGradient createGradient(
    List<Color> colors, {
    AlignmentGeometry begin = Alignment.topLeft,
    AlignmentGeometry end = Alignment.bottomRight,
  }) {
    return LinearGradient(
      colors: colors,
      begin: begin,
      end: end,
    );
  }

  /// Returns a shadow color based on elevation
  static Color getShadowColor(int elevation) {
    if (elevation <= 2) return shadowSm;
    if (elevation <= 4) return shadowMd;
    if (elevation <= 8) return shadowLg;
    if (elevation <= 12) return shadowXl;
    return shadow2xl;
  }
}
