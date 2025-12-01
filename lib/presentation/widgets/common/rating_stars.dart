import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_spacing.dart';

/// Widget de estrelas para avaliação
class RatingStars extends StatelessWidget {
  final double rating; // 0.0 to 5.0
  final double size;
  final Color? color;
  final bool showNumber;
  final int? totalReviews;

  const RatingStars({
    super.key,
    required this.rating,
    this.size = 16.0,
    this.color,
    this.showNumber = false,
    this.totalReviews,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        ...List.generate(5, (index) {
          return Icon(
            _getStarIcon(index),
            size: size,
            color: color ?? AppColors.warning,
          );
        }),
        if (showNumber) ...[
          AppSpacing.horizontalSpacerXs,
          Text(
            rating.toStringAsFixed(1),
            style: TextStyle(
              fontSize: size * 0.8,
              fontWeight: FontWeight.w600,
              color: AppColors.text,
            ),
          ),
        ],
        if (totalReviews != null) ...[
          AppSpacing.horizontalSpacerXs,
          Text(
            '($totalReviews)',
            style: TextStyle(
              fontSize: size * 0.7,
              color: AppColors.textLight,
            ),
          ),
        ],
      ],
    );
  }

  IconData _getStarIcon(int index) {
    final difference = rating - index;
    
    if (difference >= 1.0) {
      return Icons.star;
    } else if (difference >= 0.5) {
      return Icons.star_half;
    } else {
      return Icons.star_border;
    }
  }
}
