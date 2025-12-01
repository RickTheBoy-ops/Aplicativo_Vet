import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';
import '../../core/theme/app_colors.dart';

/// Tela de Splash Screen com animação Lottie
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 3),
    );

    _controller.forward();

    // Navigate after animation
    Future.delayed(const Duration(seconds: 3), () {
      if (mounted) {
        // TODO: Navegar para a tela apropriada baseado no estado de autenticação
        // Navigator.of(context).pushReplacement(
        //   MaterialPageRoute(builder: (_) => LoginScreen()),
        // );
      }
    });
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
            // TODO: Adicionar animação Lottie quando o arquivo estiver disponível
            // Lottie.asset(
            //   'assets/animations/dog_begging.json',
            //   controller: _controller,
            //   width: 200,
            //   height: 200,
            // ),
            
            // Placeholder enquanto não temos a animação
            Container(
              width: 150,
              height: 150,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: LinearGradient(
                 colors: AppColors.heroGradient,
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: const Icon(
                Icons.pets,
                size: 80,
                color: AppColors.white,
              ),
            ),
            
            const SizedBox(height: 24),
            
            const Text(
              'VetField',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
                color: AppColors.primary,
              ),
            ),
            
            const SizedBox(height: 8),
            
            const Text(
              'Cuidando do seu pet onde você estiver',
              style: TextStyle(
                fontSize: 14,
                color: AppColors.textSecondary,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
