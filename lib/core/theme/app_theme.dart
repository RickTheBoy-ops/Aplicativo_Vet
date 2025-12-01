import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'app_colors.dart';
import 'app_typography.dart';
import 'app_spacing.dart';

/// Tema principal do aplicativo VetField
class AppTheme {
  AppTheme._();

  /// Tema claro (light theme)
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      
      // Color Scheme
      colorScheme: ColorScheme.light(
        primary: AppColors.primary,
        onPrimary: AppColors.white,
        primaryContainer: AppColors.primaryLight,
        onPrimaryContainer: AppColors.primaryDark,
        
        secondary: AppColors.secondary,
        onSecondary: AppColors.white,
        secondaryContainer: AppColors.secondaryLight,
        onSecondaryContainer: AppColors.secondaryDark,
        
        tertiary: AppColors.success,
        onTertiary: AppColors.white,
        tertiaryContainer: AppColors.successLight,
        onTertiaryContainer: AppColors.successDark,
        
        error: AppColors.error,
        onError: AppColors.white,
        errorContainer: AppColors.errorLight,
        onErrorContainer: AppColors.errorDark,
        
        surface: AppColors.surface,
        onSurface: AppColors.text,
        surfaceContainerHighest: AppColors.surfaceDark,
        onSurfaceVariant: AppColors.textSecondary,
        
        outline: AppColors.border,
        outlineVariant: AppColors.borderLight,
        
        shadow: AppColors.shadowMd,
        scrim: AppColors.overlay,
      ),

      // Typography
      textTheme: AppTypography.getTextTheme(),
      fontFamily: AppTypography.fontFamily,

      // AppBar Theme
      appBarTheme: AppBarTheme(
        backgroundColor: AppColors.surface,
        foregroundColor: AppColors.text,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: AppTypography.h3.copyWith(color: AppColors.text),
        iconTheme: const IconThemeData(
          color: AppColors.text,
          size: AppSpacing.iconMd,
        ),
        systemOverlayStyle: SystemUiOverlayStyle.dark,
      ),

      // Card Theme
      cardTheme: CardTheme(
        color: AppColors.surface,
        elevation: AppSpacing.elevationSm,
        shape: RoundedRectangleBorder(
          borderRadius: AppSpacing.borderRadiusMd,
        ),
        margin: const EdgeInsets.all(AppSpacing.sm),
      ),

      // Input Decoration Theme
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.surfaceLight,
        contentPadding: AppSpacing.inputPadding,
        
        border: OutlineInputBorder(
          borderRadius: AppSpacing.borderRadiusMd,
          borderSide: const BorderSide(color: AppColors.border),
        ),
        
        enabledBorder: OutlineInputBorder(
          borderRadius: AppSpacing.borderRadiusMd,
          borderSide: const BorderSide(color: AppColors.border),
        ),
        
        focusedBorder: OutlineInputBorder(
          borderRadius: AppSpacing.borderRadiusMd,
          borderSide: const BorderSide(color: AppColors.primary, width: 2),
        ),
        
        errorBorder: OutlineInputBorder(
          borderRadius: AppSpacing.borderRadiusMd,
          borderSide: const BorderSide(color: AppColors.error),
        ),
        
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: AppSpacing.borderRadiusMd,
          borderSide: const BorderSide(color: AppColors.error, width: 2),
        ),
        
        disabledBorder: OutlineInputBorder(
          borderRadius: AppSpacing.borderRadiusMd,
          borderSide: const BorderSide(color: AppColors.borderLight),
        ),
        
        labelStyle: AppTypography.body.copyWith(color: AppColors.textSecondary),
        hintStyle: AppTypography.body.copyWith(color: AppColors.textLight),
        errorStyle: AppTypography.caption.copyWith(color: AppColors.error),
      ),

      // Elevated Button Theme
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: AppColors.white,
          elevation: AppSpacing.elevationSm,
          padding: AppSpacing.buttonPaddingMedium,
          minimumSize: const Size(double.infinity, AppSpacing.buttonHeightMedium),
          shape: RoundedRectangleBorder(
            borderRadius: AppSpacing.borderRadiusMd,
          ),
          textStyle: AppTypography.buttonMedium,
        ),
      ),

      // Outlined Button Theme
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: AppColors.primary,
          side: const BorderSide(color: AppColors.primary, width: 1.5),
          padding: AppSpacing.buttonPaddingMedium,
          minimumSize: const Size(double.infinity, AppSpacing.buttonHeightMedium),
          shape: RoundedRectangleBorder(
            borderRadius: AppSpacing.borderRadiusMd,
          ),
          textStyle: AppTypography.buttonMedium,
        ),
      ),

      // Text Button Theme
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: AppColors.primary,
          padding: AppSpacing.buttonPaddingMedium,
          textStyle: AppTypography.buttonMedium,
        ),
      ),

      // Icon Button Theme
      iconButtonTheme: IconButtonThemeData(
        style: IconButton.styleFrom(
          foregroundColor: AppColors.text,
          iconSize: AppSpacing.iconMd,
        ),
      ),

      // Bottom Navigation Bar Theme
      bottomNavigationBarTheme: const BottomNavigationBarTheme(
        backgroundColor: AppColors.surface,
        selectedItemColor: AppColors.primary,
        unselectedItemColor: AppColors.textLight,
        type: BottomNavigationBarType.fixed,
        elevation: AppSpacing.elevationMd,
        selectedLabelStyle: AppTypography.captionMedium,
        unselectedLabelStyle: AppTypography.caption,
      ),

      // Floating Action Button Theme
      floatingActionButtonTheme: FloatingActionButtonThemeData(
        backgroundColor: AppColors.primary,
        foregroundColor: AppColors.white,
        elevation: AppSpacing.elevationMd,
        shape: RoundedRectangleBorder(
          borderRadius: AppSpacing.borderRadiusLg,
        ),
      ),

      // Dialog Theme
      dialogTheme: DialogTheme(
        backgroundColor: AppColors.surface,
        elevation: AppSpacing.elevationXl,
        shape: RoundedRectangleBorder(
          borderRadius: AppSpacing.borderRadiusLg,
        ),
        titleTextStyle: AppTypography.h3.copyWith(color: AppColors.text),
        contentTextStyle: AppTypography.body.copyWith(color: AppColors.textSecondary),
      ),

      // Snackbar Theme
      snackBarTheme: SnackBarThemeData(
        backgroundColor: AppColors.text,
        contentTextStyle: AppTypography.body.copyWith(color: AppColors.white),
        shape: RoundedRectangleBorder(
          borderRadius: AppSpacing.borderRadiusMd,
        ),
        behavior: SnackBarBehavior.floating,
        elevation: AppSpacing.elevationMd,
      ),

      // Chip Theme
      chipTheme: ChipThemeData(
        backgroundColor: AppColors.surfaceDark,
        deleteIconColor: AppColors.textSecondary,
        labelStyle: AppTypography.bodyMedium.copyWith(color: AppColors.text),
        padding: AppSpacing.paddingSm,
        shape: RoundedRectangleBorder(
          borderRadius: AppSpacing.borderRadiusRound,
        ),
      ),

      // Divider Theme
      dividerTheme: const DividerThemeData(
        color: AppColors.border,
        thickness: 1,
        space: AppSpacing.md,
      ),

      // Progress Indicator Theme
      progressIndicatorTheme: const ProgressIndicatorThemeData(
        color: AppColors.primary,
        linearTrackColor: AppColors.borderLight,
        circularTrackColor: AppColors.borderLight,
      ),

      // Switch Theme
      switchTheme: SwitchThemeData(
        thumbColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return AppColors.primary;
          }
          return AppColors.textLight;
        }),
        trackColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return AppColors.primaryLight;
          }
          return AppColors.borderLight;
        }),
      ),

      // Checkbox Theme
      checkboxTheme: CheckboxThemeData(
        fillColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return AppColors.primary;
          }
          return AppColors.transparent;
        }),
        checkColor: WidgetStateProperty.all(AppColors.white),
        shape: RoundedRectangleBorder(
          borderRadius: AppSpacing.borderRadiusXs,
        ),
      ),

      // Radio Theme
      radioTheme: RadioThemeData(
        fillColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return AppColors.primary;
          }
          return AppColors.textLight;
        }),
      ),

      // Scrollbar Theme
      scrollbarTheme: ScrollbarThemeData(
        thumbColor: WidgetStateProperty.all(AppColors.textLight),
        trackColor: WidgetStateProperty.all(AppColors.borderLight),
        radius: const Radius.circular(AppSpacing.radiusSm),
        thickness: WidgetStateProperty.all(4.0),
      ),
    );
  }
}
