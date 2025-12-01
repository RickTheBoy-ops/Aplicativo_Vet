import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../../providers/vet_provider.dart';
import '../../../providers/auth_provider.dart';
import '../../widgets/common/app_card.dart';
import '../../widgets/common/rating_stars.dart';
import '../../../core/theme/app_colors.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    // Carrega veterinários em destaque ao iniciar
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<VetProvider>().loadFeaturedVets();
    });
  }

  @override
  Widget build(BuildContext context) {
    final user = context.select((AuthProvider p) => p.user);
    final vets = context.watch<VetProvider>().vets;
    final isLoading = context.watch<VetProvider>().isLoading;

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Olá, ${user?.name ?? "Visitante"}! 👋',
                        style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                          fontWeight: FontWeight.bold,
                          color: AppColors.textPrimary,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Como está seu pet hoje?',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: AppColors.textSecondary,
                        ),
                      ),
                    ],
                  ),
                  CircleAvatar(
                    backgroundImage: user?.avatarUrl != null ? CachedNetworkImageProvider(user!.avatarUrl!) : null,
                    backgroundColor: AppColors.primaryLight,
                    child: user?.avatarUrl == null ? const Icon(Icons.person, color: AppColors.white) : null,
                  ),
                ],
              ),
              
              const SizedBox(height: 24),

              // Banner Promocional ou Informativo
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  gradient: LinearGradient(colors: AppColors.heroGradient),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Atendimento em Domicílio', 
                      style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 8),
                    const Text('Encontre os melhores veterinários perto de você.',
                      style: TextStyle(color: Colors.white, fontSize: 14)),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: () { /* Navegar para busca */ },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.white,
                        foregroundColor: AppColors.primary,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                      child: const Text('Agendar Agora'),
                    )
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Seção de Destaques
              Text(
                'Veterinários Recomendados',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 16),

              if (isLoading)
                const Center(child: CircularProgressIndicator())
              else if (vets.isEmpty)
                const Text('Nenhum veterinário encontrado no momento.')
              else
                ListView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: vets.length,
                  itemBuilder: (context, index) {
                    final vet = vets[index];
                    return AppCard(
                      margin: const EdgeInsets.only(bottom: 12),
                      onTap: () {
                        // context.push('/owner/vet/${vet.id}');
                      },
                      child: Row(
                        children: [
                          Container(
                            width: 60,
                            height: 60,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(8),
                              color: AppColors.surfaceDark,
                              image: vet.avatarUrl != null 
                                ? DecorationImage(image: CachedNetworkImageProvider(vet.avatarUrl!), fit: BoxFit.cover)
                                : null,
                            ),
                            child: vet.avatarUrl == null ? const Icon(Icons.medical_services, color: AppColors.textLight) : null,
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  vet.name,
                                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                Text(
                                  vet.specialties?.join(', ') ?? 'Veterinário', 
                                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                    color: AppColors.textSecondary,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                RatingStars(rating: vet.rating ?? 0, size: 14, showNumber: true),
                              ],
                            ),
                          ),
                          Icon(Icons.chevron_right, color: AppColors.textLight),
                        ],
                      ),
                    );
                  },
                ),
            ],
          ),
        ),
      ),
    );
  }
}
