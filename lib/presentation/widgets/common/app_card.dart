import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_spacing.dart';

/// Card customizado do VetField
class AppCard extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? margin;
  final Color? color;
  final double? elevation;
  final VoidCallback? onTap;
  final BorderRadius? borderRadius;

  const AppCard({
    super.key,
    required this.child,
    this.padding,
    this.margin,
    this.color,
    this.elevation,
    this.onTap,
    this.borderRadius,
  });

  @override
  Widget build(BuildContext context) {
    final card = Card(
      color: color ?? AppColors.surface,
      elevation: elevation ?? AppSpacing.elevationSm,
      margin: margin ?? AppSpacing.paddingSm,
      shape: RoundedRectangleBorder(
        borderRadius: borderRadius ?? AppSpacing.borderRadiusMd,
      ),
      child: Padding(
        padding: padding ?? AppSpacing.paddingMd,
        child: child,
      ),
    );

    if (onTap != null) {
      return InkWell(
        onTap: onTap,
        borderRadius: borderRadius ?? AppSpacing.borderRadiusMd,
        child: card,
      );
    }

    return card;
  }
}
