
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:vet_field_flutter/core/constants/app_constants.dart';
import 'package:vet_field_flutter/features/bodymap/domain/body_part_model.dart';

class BodyMapInteractive extends StatelessWidget {
  final String animalType;

  const BodyMapInteractive({super.key, required this.animalType});

  // Placeholder for dog body parts
  List<BodyPart> get _dogBodyParts => [
        BodyPart(
          name: 'Olhos',
          area: const Rect.fromLTWH(100, 50, 80, 40),
          specialty: AppConstants.vetSpecialties[2], // Oftalmologista
        ),
        BodyPart(
          name: 'Patas',
          area: const Rect.fromLTWH(150, 250, 100, 50),
          specialty: AppConstants.vetSpecialties[3], // Ortopedista
        ),
        BodyPart(
          name: 'Pele',
          area: const Rect.fromLTWH(50, 100, 200, 150),
          specialty: AppConstants.vetSpecialties[1], // Dermatologista
        ),
      ];

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapUp: (details) {
        final RenderBox box = context.findRenderObject() as RenderBox;
        final Offset localPosition = box.globalToLocal(details.globalPosition);

        for (final part in _dogBodyParts) {
          if (part.area.contains(localPosition)) {
            _onPartTapped(context, part.specialty);
            return;
          }
        }
      },
      child: Stack(
        children: [
          // Use a placeholder for the animal image
          Image.asset(
            'assets/images/dog_silhouette.png', // Substitua pelo seu asset
            fit: BoxFit.contain,
          ),
          // You can uncomment the following to visualize the tappable areas
          /* ...
          ... */
        ],
      ),
    );
  }

  void _onPartTapped(BuildContext context, String specialty) {
    // Navigate to search screen with the specialty as a query parameter
    context.go('/owner/search?specialty=$specialty');
  }
}
