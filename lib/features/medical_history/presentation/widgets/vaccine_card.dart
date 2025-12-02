import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../../../core/theme/app_colors.dart';
import '../domain/vaccine_model.dart';

class VaccineCard extends StatelessWidget {
  final VaccineRecommendation recommendation;

  const VaccineCard({super.key, required this.recommendation});

  Color _getStatusColor(VaccineStatus status) {
    switch (status) {
      case VaccineStatus.done:
        return AppColors.success.withOpacity(0.7);
      case VaccineStatus.pending:
        return AppColors.warning.withOpacity(0.8);
      case VaccineStatus.overdue:
        return AppColors.error.withOpacity(0.8);
    }
  }

  String _getStatusText(VaccineStatus status) {
    switch (status) {
      case VaccineStatus.done:
        return 'Aplicada';
      case VaccineStatus.pending:
        return 'Próxima Dose';
      case VaccineStatus.overdue:
        return 'Atrasada';
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = _getStatusColor(recommendation.status);
    final statusText = _getStatusText(recommendation.status);

    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      shape: RoundedRectangleBorder(
        side: BorderSide(color: color, width: 1.5),
        borderRadius: BorderRadius.circular(12),
      ),
      elevation: 2,
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              width: 100,
              padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 8),
              decoration: BoxDecoration(
                color: color,
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(12),
                  bottomLeft: Radius.circular(12),
                ),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    DateFormat('d', 'pt_BR').format(recommendation.dueDate),
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                        color: Colors.white, fontWeight: FontWeight.bold),
                  ),
                  Text(
                    DateFormat('MMM', 'pt_BR').format(recommend_ion.dueDate).toUpperCase(),
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: Colors.white, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      recommendation.vaccineName,
                      style: Theme.of(context)
                          .textTheme
                          .titleLarge
                          ?.copyWith(fontWeight: FontWeight.bold),
                    ),
                    if (recommendation.details != null &&
                        recommendation.details!.isNotEmpty)
                      Padding(
                        padding: const EdgeInsets.only(top: 4.0),
                        child: Text(
                          recommendation.details!,
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                      ),
                    const Spacer(),
                    const SizedBox(height: 8),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: color.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            statusText.toUpperCase(),
                            style: Theme.of(context)
                                .textTheme
                                .labelSmall
                                ?.copyWith(color: color, fontWeight: FontWeight.bold),
                          ),
                        ),
                        if (recommendation.status != VaccineStatus.done)
                          ElevatedButton(
                            onPressed: () { 
                              // TODO: Navigate to scheduling screen
                            },
                            style: ElevatedButton.styleFrom(
                              padding: const EdgeInsets.symmetric(horizontal: 16),
                              tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                            ),
                            child: const Text('Agendar Dose'),
                          ),
                      ],
                    ),
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
