import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../../data/models/user_model.dart';
import '../../../core/theme/app_colors.dart';
import '../../widgets/common/app_button.dart';

class VetDetailScreen extends StatelessWidget {
  final UserModel vet;

  const VetDetailScreen({super.key, required this.vet});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 250.0,
            pinned: true,
            flexibleSpace: FlexibleSpaceBar(
              title: Text(vet.name),
              background: vet.avatarUrl != null
                  ? CachedNetworkImage(
                      imageUrl: vet.avatarUrl!,
                      fit: BoxFit.cover,
                    )
                  : Container(color: AppColors.primaryLight),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Sobre',
                      style: Theme.of(context).textTheme.headlineSmall),
                  const SizedBox(height: 8),
                  Text(vet.bio ?? 'Sem descrição disponível.'),
                  const SizedBox(height: 24),
                  Text('Especialidades',
                      style: Theme.of(context).textTheme.headlineSmall),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 8,
                    children: (vet.specialties ?? [])
                        .map((s) => Chip(label: Text(s)))
                        .toList(),
                  ),
                  const SizedBox(height: 24),
                ],
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: AppButton(
            text: 'Agendar Visita',
            onPressed: () {},
          ),
        ),
      ),
    );
  }
}
