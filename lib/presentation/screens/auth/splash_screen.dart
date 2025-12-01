import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../providers/auth_provider.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with TickerProviderStateMixin {
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
    final minSplashTime = Future.delayed(const Duration(seconds: 3));
    final loadUser = authProvider.loadCurrentUser();

    await Future.wait([minSplashTime, loadUser]);

    if (!mounted) return;

    // Redirecionamento baseado no estado é feito automaticamente pelo GoRouter (redirect logic)
    // Apenas forçamos um refresh na rota se necessário, mas o GoRouter listener do provider deve cuidar disso
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
              errorBuilder: (context, error, stackTrace) {
                // Fallback elegante se o JSON falhar
                return const Icon(Icons.pets, size: 100, color: AppColors.primary);
              },
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
            Text(
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
}
