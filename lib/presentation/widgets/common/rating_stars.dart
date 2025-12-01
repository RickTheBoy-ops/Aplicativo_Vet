import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class RatingStars extends StatelessWidget {
  final double rating;
  final double size;
  final bool showNumber;
  final Color color;

  const RatingStars({
    super.key,
    required this.rating,
    this.size = 16,
    this.showNumber = false,
    this.color = Colors.amber,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          mainAxisSize: MainAxisSize.min,
          children: List.generate(5, (index) {
            if (index < rating.floor()) {
              return Icon(Icons.star, size: size, color: color);
            } else if (index < rating && rating % 1 != 0) {
              return Icon(Icons.star_half, size: size, color: color);
            } else {
              return Icon(Icons.star_border, size: size, color: AppColors.textLight);
            }
          }),
        ),
        if (showNumber) ...[
          const SizedBox(width: 4),
          Text(
            rating.toStringAsFixed(1),
            style: TextStyle(
              fontSize: size,
              fontWeight: FontWeight.bold,
              color: AppColors.textSecondary,
            ),
          ),
        ],
      ],
    );
  }
}
