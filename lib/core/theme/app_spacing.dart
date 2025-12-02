import 'package:flutter/material.dart';

/// Design System - Espaçamento do VetField
class AppSpacing {
  AppSpacing._();

  // ===== Spacing Values =====
  static const double xs = 4;
  static const double sm = 8;
  static const double md = 12;
  static const double lg = 16;
  static const double xl = 20;
  static const double xxl = 24;
  static const double xxxl = 32;

  // ===== Padding Helpers =====
  
  static const EdgeInsets paddingXs = EdgeInsets.all(xs);
  static const EdgeInsets paddingSm = EdgeInsets.all(sm);
  static const EdgeInsets paddingMd = EdgeInsets.all(md);
  static const EdgeInsets paddingLg = EdgeInsets.all(lg);
  static const EdgeInsets paddingXl = EdgeInsets.all(xl);
  static const EdgeInsets paddingXxl = EdgeInsets.all(xxl);
  static const EdgeInsets paddingXxxl = EdgeInsets.all(xxxl);

  // Horizontal Padding
  static const EdgeInsets paddingHorizontalXs =
      EdgeInsets.symmetric(horizontal: xs);
  static const EdgeInsets paddingHorizontalSm =
      EdgeInsets.symmetric(horizontal: sm);
  static const EdgeInsets paddingHorizontalMd =
      EdgeInsets.symmetric(horizontal: md);
  static const EdgeInsets paddingHorizontalLg =
      EdgeInsets.symmetric(horizontal: lg);
  static const EdgeInsets paddingHorizontalXl =
      EdgeInsets.symmetric(horizontal: xl);
  static const EdgeInsets paddingHorizontalXxl =
      EdgeInsets.symmetric(horizontal: xxl);

  // Vertical Padding
  static const EdgeInsets paddingVerticalXs = 
      EdgeInsets.symmetric(vertical: xs);
  static const EdgeInsets paddingVerticalSm = 
      EdgeInsets.symmetric(vertical: sm);
  static const EdgeInsets paddingVerticalMd = 
      EdgeInsets.symmetric(vertical: md);
  static const EdgeInsets paddingVerticalLg = 
      EdgeInsets.symmetric(vertical: lg);
  static const EdgeInsets paddingVerticalXl = 
      EdgeInsets.symmetric(vertical: xl);
  static const EdgeInsets paddingVerticalXxl = 
      EdgeInsets.symmetric(vertical: xxl);

  // ===== Border Radius =====
  
  static const double radiusXs = 4;
  static const double radiusSm = 8;
  static const double radiusMd = 12;
  static const double radiusLg = 16;
  static const double radiusXl = 20;
  static const double radiusXxl = 24;
  static const double radiusRound = 999;

  static BorderRadius borderRadiusXs = BorderRadius.circular(radiusXs);
  static BorderRadius borderRadiusSm = BorderRadius.circular(radiusSm);
  static BorderRadius borderRadiusMd = BorderRadius.circular(radiusMd);
  static BorderRadius borderRadiusLg = BorderRadius.circular(radiusLg);
  static BorderRadius borderRadiusXl = BorderRadius.circular(radiusXl);
  static BorderRadius borderRadiusXxl = BorderRadius.circular(radiusXxl);
  static BorderRadius borderRadiusRound = BorderRadius.circular(radiusRound);

  // ===== Elevation & Shadows =====
  
  static const double elevationNone = 0;
  static const double elevationXs = 1;
  static const double elevationSm = 2;
  static const double elevationMd = 4;
  static const double elevationLg = 8;
  static const double elevationXl = 12;
  static const double elevationXxl = 16;

  // ===== Icon Sizes =====
  
  static const double iconXs = 16;
  static const double iconSm = 20;
  static const double iconMd = 24;
  static const double iconLg = 32;
  static const double iconXl = 40;
  static const double iconXxl = 48;

  // ===== Button Sizes =====
  
  static const double buttonHeightSmall = 36;
  static const double buttonHeightMedium = 44;
  static const double buttonHeightLarge = 52;

  static const EdgeInsets buttonPaddingSmall = EdgeInsets.symmetric(
    horizontal: md,
    vertical: sm,
  );
  
  static const EdgeInsets buttonPaddingMedium = EdgeInsets.symmetric(
    horizontal: lg,
    vertical: md,
  );
  
  static const EdgeInsets buttonPaddingLarge = EdgeInsets.symmetric(
    horizontal: xl,
    vertical: lg,
  );

  // ===== Input Sizes =====
  
  static const double inputHeight = 48;
  static const EdgeInsets inputPadding = EdgeInsets.symmetric(
    horizontal: lg,
    vertical: md,
  );

  // ===== Screen Padding =====
  
  static const EdgeInsets screenPadding = EdgeInsets.all(lg);
  static const EdgeInsets screenPaddingHorizontal =
      EdgeInsets.symmetric(horizontal: lg);
  static const EdgeInsets screenPaddingVertical =
      EdgeInsets.symmetric(vertical: lg);

  // ===== SizedBox Helpers =====
  
  static const SizedBox spacerXs = SizedBox(height: xs, width: xs);
  static const SizedBox spacerSm = SizedBox(height: sm, width: sm);
  static const SizedBox spacerMd = SizedBox(height: md, width: md);
  static const SizedBox spacerLg = SizedBox(height: lg, width: lg);
  static const SizedBox spacerXl = SizedBox(height: xl, width: xl);
  static const SizedBox spacerXxl = SizedBox(height: xxl, width: xxl);

  static const SizedBox verticalSpacerXs = SizedBox(height: xs);
  static const SizedBox verticalSpacerSm = SizedBox(height: sm);
  static const SizedBox verticalSpacerMd = SizedBox(height: md);
  static const SizedBox verticalSpacerLg = SizedBox(height: lg);
  static const SizedBox verticalSpacerXl = SizedBox(height: xl);
  static const SizedBox verticalSpacerXxl = SizedBox(height: xxl);

  static const SizedBox horizontalSpacerXs = SizedBox(width: xs);
  static const SizedBox horizontalSpacerSm = SizedBox(width: sm);
  static const SizedBox horizontalSpacerMd = SizedBox(width: md);
  static const SizedBox horizontalSpacerLg = SizedBox(width: lg);
  static const SizedBox horizontalSpacerXl = SizedBox(width: xl);
  static const SizedBox horizontalSpacerXxl = SizedBox(width: xxl);
}
