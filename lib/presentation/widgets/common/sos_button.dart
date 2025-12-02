
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../../core/theme/app_colors.dart';
import '../../../providers/vet_provider.dart';

class SosButton extends StatelessWidget {
  const SosButton({super.key});

  @override
  Widget build(BuildContext context) {
    return FloatingActionButton(
      onPressed: () => _showEmergencyConfirmation(context),
      backgroundColor: AppColors.error,
      shape: const CircleBorder(),
      child: const Icon(
        Icons.sos,
        color: Colors.white,
        size: 36,
      ),
    );
  }

  void _showEmergencyConfirmation(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext dialogContext) {
        return AlertDialog(
          title: const Text('Confirmação de Emergência'),
          content: const Text(
              'Você está prestes a acionar o modo de emergência. Isso deve ser feito apenas em situações críticas. Deseja continuar?'),
          actions: <Widget>[
            TextButton(
              child: const Text('Cancelar'),
              onPressed: () {
                Navigator.of(dialogContext).pop();
              },
            ),
            TextButton(
              style: TextButton.styleFrom(
                foregroundColor: AppColors.error,
              ),
              child: const Text('É uma Emergência!'),
              onPressed: () {
                Navigator.of(dialogContext).pop();
                _activateEmergencyMode(context);
              },
            ),
          ],
        );
      },
    );
  }

  void _activateEmergencyMode(BuildContext context) {
    final vetProvider = Provider.of<VetProvider>(context, listen: false);
    vetProvider.triggerEmergencyMode().then((_) {
      context.go('/emergency');
    });
  }
}
