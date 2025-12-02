import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../core/theme/app_colors.dart';
import '../../../providers/vet_provider.dart';
import '../../widgets/common/loading_widget.dart';
import '../../../data/models/user_model.dart';
import '../../widgets/common/rating_stars.dart';

class EmergencyScreen extends StatelessWidget {
  const EmergencyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Veterinários Disponíveis AGORA'),
        backgroundColor: AppColors.error,
        foregroundColor: Colors.white,
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () {
            context.read<VetProvider>().resetEmergencyMode();
            // Pop until we are back at the home screen.
            while(context.canPop()) {
              context.pop();
            }
          },
        ),
      ),
      body: Consumer<VetProvider>(
        builder: (context, vetProvider, child) {
          if (vetProvider.isLoading) {
            return const LoadingWidget(message: 'Buscando ajuda profissional...');
          }

          if (vetProvider.error != null) {
            return Center(
              child: Text('Erro ao buscar veterinários: ${vetProvider.error}'),
            );
          }

          if (vetProvider.vets.isEmpty) {
            return const Center(
              child: Padding(
                padding: EdgeInsets.all(24.0),
                child: Text(
                  'Nenhum veterinário com disponibilidade imediata encontrado no raio de 5km.',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 16),
                ),
              ),
            );
          }

          return ListView.builder(
            padding: const EdgeInsets.all(16.0),
            itemCount: vetProvider.vets.length,
            itemBuilder: (context, index) {
              final vet = vetProvider.vets[index];
              return _buildVetCard(context, vet);
            },
          );
        },
      ),
    );
  }

  Widget _buildVetCard(BuildContext context, UserModel vet) {
    return Card(
      elevation: 4,
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              vet.name,
              style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            if (vet.specialties?.isNotEmpty ?? false)
              Text(
                vet.specialties!.join(', '),
                style: Theme.of(context).textTheme.titleMedium,
              ),
            const SizedBox(height: 8),
            if (vet.averageRating != null)
              Row(
                children: [
                  RatingStars(rating: vet.averageRating ?? 0),
                  const SizedBox(width: 8),
                  Text(
                    '${vet.averageRating?.toStringAsFixed(1)} (${vet.reviewCount} avaliações)',
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                ],
              ),
            const SizedBox(height: 16),
            const Text(
              'Chegada estimada: 5-10 min (mock)', // Mocked data
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: AppColors.success,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    icon: const Icon(Icons.phone, color: Colors.white),
                    label: const Text('Ligar'),
                    onPressed: () => _makePhoneCall(vet.phone),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.success,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: ElevatedButton.icon(
                    icon: const Icon(Icons.directions, color: Colors.white),
                    label: const Text('Navegar'),
                    onPressed: () => _openMaps(vet.latitude, vet.longitude),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Theme.of(context).primaryColor,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _makePhoneCall(String? phoneNumber) async {
    if (phoneNumber == null || phoneNumber.isEmpty) {
      return;
    }
    final Uri launchUri = Uri(scheme: 'tel', path: phoneNumber);
    if (await canLaunchUrl(launchUri)) {
      await launchUrl(launchUri);
    }
  }

  Future<void> _openMaps(double? lat, double? lon) async {
    if (lat == null || lon == null) {
      return;
    }
    final query = '$lat,$lon';
    // Universal maps link
    final uri = Uri.https('www.google.com', '/maps/search/', {'api': '1', 'query': query});
    
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }
}
