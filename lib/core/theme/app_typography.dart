import 'package:flutter/material.dart';

/// Design System - Tipografia do VetField
class AppTypography {
  AppTypography._();

  // Font Family
  static const String fontFamily = 'Inter';

  // ===== Font Sizes =====
  static const double h1Size = 30;
  static const double h2Size = 24;
  static const double h3Size = 20;
  static const double bodySize = 14;
  static const double captionSize = 12;
  static const double smallSize = 10;

  // ===== Font Weights =====
  static const FontWeight regular = FontWeight.w400;
  static const FontWeight medium = FontWeight.w500;
  static const FontWeight semiBold = FontWeight.w600;
  static const FontWeight bold = FontWeight.w700;

  // ===== Letter Spacing =====
  static const double defaultLetterSpacing = 0;
  static const double wideLetterSpacing = 0.5;

  // ===== Line Heights =====
  static const double h1LineHeight = 1.3;
  static const double h2LineHeight = 1.3;
  static const double h3LineHeight = 1.3;
  static const double bodyLineHeight = 1.5;

  // ===== Text Styles =====
  
  /// Heading 1 - 30px, weight 600
  static const TextStyle h1 = TextStyle(
    fontFamily: fontFamily,
    fontSize: h1Size,
    fontWeight: semiBold,
    height: h1LineHeight,
    letterSpacing: defaultLetterSpacing,
  );

  /// Heading 2 - 24px, weight 600
  static const TextStyle h2 = TextStyle(
    fontFamily: fontFamily,
    fontSize: h2Size,
    fontWeight: semiBold,
    height: h2LineHeight,
    letterSpacing: defaultLetterSpacing,
  );

  /// Heading 3 - 20px, weight 600
  static const TextStyle h3 = TextStyle(
    fontFamily: fontFamily,
    fontSize: h3Size,
    fontWeight: semiBold,
    height: h3LineHeight,
    letterSpacing: defaultLetterSpacing,
  );

  /// Body text - 14px, weight 400
  static const TextStyle body = TextStyle(
    fontFamily: fontFamily,
    fontSize: bodySize,
    fontWeight: regular,
    height: bodyLineHeight,
    letterSpacing: defaultLetterSpacing,
  );

  /// Body medium - 14px, weight 500
  static const TextStyle bodyMedium = TextStyle(
    fontFamily: fontFamily,
    fontSize: bodySize,
    fontWeight: medium,
    height: bodyLineHeight,
    letterSpacing: defaultLetterSpacing,
  );

  /// Body semibold - 14px, weight 600
  static const TextStyle bodySemiBold = TextStyle(
    fontFamily: fontFamily,
    fontSize: bodySize,
    fontWeight: semiBold,
    height: bodyLineHeight,
    letterSpacing: defaultLetterSpacing,
  );

  /// Caption - 12px, weight 400
  static const TextStyle caption = TextStyle(
    fontFamily: fontFamily,
    fontSize: captionSize,
    fontWeight: regular,
    height: bodyLineHeight,
    letterSpacing: defaultLetterSpacing,
  );

  /// Caption medium - 12px, weight 500
  static const TextStyle captionMedium = TextStyle(
    fontFamily: fontFamily,
    fontSize: captionSize,
    fontWeight: medium,
    height: bodyLineHeight,
    letterSpacing: defaultLetterSpacing,
  );

  /// Small text - 10px, weight 400
  static const TextStyle small = TextStyle(
    fontFamily: fontFamily,
    fontSize: smallSize,
    fontWeight: regular,
    height: bodyLineHeight,
    letterSpacing: defaultLetterSpacing,
  );

  // ===== Button Text Styles =====
  
  static const TextStyle buttonLarge = TextStyle(
    fontFamily: fontFamily,
    fontSize: 16,
    fontWeight: semiBold,
    letterSpacing: wideLetterSpacing,
  );

  static const TextStyle buttonMedium = TextStyle(
    fontFamily: fontFamily,
    fontSize: bodySize,
    fontWeight: semiBold,
    letterSpacing: wideLetterSpacing,
  );

  static const TextStyle buttonSmall = TextStyle(
    fontFamily: fontFamily,
    fontSize: captionSize,
    fontWeight: semiBold,
    letterSpacing: wideLetterSpacing,
  );

  // ===== Flutter TextTheme =====
  
  /// Retorna TextTheme configurado para Material
  static TextTheme getTextTheme() => const TextTheme(
      displayLarge: h1,
      displayMedium: h2,
      displaySmall: h3,
      headlineMedium: h3,
      titleLarge: h3,
      titleMedium: bodySemiBold,
      titleSmall: bodyMedium,
      bodyLarge: body,
      bodyMedium: body,
      bodySmall: caption,
      labelLarge: buttonMedium,
      labelMedium: buttonSmall,
      labelSmall: small,
    );
}
