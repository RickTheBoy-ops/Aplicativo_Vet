import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lottie/lottie.dart';
import 'package:provider/provider.dart';
import '../../../core/theme/app_colors.dart';
import '../../../providers/auth_provider.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this);
    _initializeApp();
  }

  Future<void> _initializeApp() async {
    // 1. Iniciar animação
    // 2. Tentar login silencioso / carregar token
    final authProvider = context.read<AuthProvider>();

    // Simula tempo mínimo de splash ou espera carregamento real
    final minSplashTime = Future<void>.delayed(const Duration(seconds: 3));
    
    // Adiciona timeout para evitar travamento eterno se backend estiver offline
    // Se falhar ou der timeout, assume não autenticado
    final loadUser = authProvider.loadCurrentUser().timeout(
      const Duration(seconds: 5),
      onTimeout: () {
        debugPrint('Timeout loading user data - proceeding to login');
        return false;
      },
    );

    try {
      await Future.wait([minSplashTime, loadUser]);
    } on Exception catch (e) {
      debugPrint('Error initializing app: $e');
    }

    if (!mounted) {
      return;
    }

    // Verificação manual para garantir navegação
    if (mounted && !authProvider.isAuthenticated) {
      context.go('/auth/login');
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        backgroundColor: AppColors.background,
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Lottie Animation
              Lottie.asset(
                'assets/animations/dog_walking.json', // Certifique-se de ter este arquivo
                controller: _controller,
                onLoaded: (composition) {
                  _controller
                    ..duration = composition.duration
                    ..repeat();
                },
                width: 250,
                height: 250,
                errorBuilder: (context, error, stackTrace) => const Icon(
                  Icons.pets,
                  size: 100,
                  color: AppColors.primary,
                ),
              ),
              const SizedBox(height: 24),
              // Loading discreto
              const SizedBox(
                width: 150,
                child: LinearProgressIndicator(
                  color: AppColors.primary,
                  backgroundColor: AppColors.primaryLight,
                  borderRadius: BorderRadius.all(Radius.circular(10)),
                ),
              ),
              const SizedBox(height: 16),
              const Text(
                'Preparando o melhor para seu pet...',
                style: TextStyle(
                  color: AppColors.textSecondary,
                  fontSize: 14,
                  fontStyle: FontStyle.italic,
                ),
              ),
            ],
          ),
        ),
      );
}
