import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';
import '../../../data/models/user_model.dart';
import '../../widgets/common/app_button.dart';

class VetDetailScreen extends StatelessWidget {

  const VetDetailScreen({required this.vet, super.key});
  final UserModel vet;

  @override
  Widget build(BuildContext context) => Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 250,
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
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Sobre',
                      style: Theme.of(context).textTheme.headlineSmall,),
                  const SizedBox(height: 8),
                  Text(vet.bio ?? 'Sem descrição disponível.'),
                  const SizedBox(height: 24),
                  Text('Especialidades',
                      style: Theme.of(context).textTheme.headlineSmall,),
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
          padding: const EdgeInsets.all(16),
          child: AppButton(
            text: 'Agendar Visita',
            onPressed: () {},
          ),
        ),
      ),
    );
}
