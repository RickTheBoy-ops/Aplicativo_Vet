import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../presentation/screens/auth/splash_screen.dart';
import '../presentation/screens/auth/login_screen.dart';
import '../presentation/screens/auth/register_type_screen.dart';
import '../presentation/screens/auth/register_screen.dart';
import '../presentation/screens/owner/owner_main_screen.dart';
import '../core/constants/app_constants.dart';

/// Helper para transições suaves (Fade + Slide suave)
Page<dynamic> _buildPageWithTransition(BuildContext context, GoRouterState state, Widget child) {
  return CustomTransitionPage(
    key: state.pageKey,
    child: child,
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      const begin = Offset(1.0, 0.0); // Entra da direita
      const end = Offset.zero;
      const curve = Curves.easeInOutCubic; // Curva mais "premium" que linear

      var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));

      return SlideTransition(
        position: animation.drive(tween),
        child: FadeTransition(
          opacity: animation,
          child: child,
        ),
      );
    },
    transitionDuration: const Duration(milliseconds: 400),
  );
}

/// Configuração de rotas com GoRouter
final appRouter = GoRouter(
  initialLocation: '/',
  redirect: (context, state) {
    final authProvider = context.read<AuthProvider>();
    final isAuthenticated = authProvider.isAuthenticated;
    final isOnAuthPage = state.matchedLocation.startsWith('/auth');

    // Se não autenticado e não está em página de auth, redirecionar para login
    if (!isAuthenticated && !isOnAuthPage && state.matchedLocation != '/') {
      return '/auth/login';
    }

    // Se autenticado e está em página de auth, redirecionar para home
    if (isAuthenticated && (isOnAuthPage || state.matchedLocation == '/')) {
      if (authProvider.isOwner) {
        return '/owner/home';
      } else if (authProvider.isVet) {
        return '/vet/dashboard';
      }
    }

    return null; // Não redirecionar
  },
  routes: [
    // Splash
    GoRoute(
      path: '/',
      builder: (context, state) => const SplashScreen(),
    ),

    // Auth Routes
    GoRoute(
      path: '/auth',
      redirect: (context, state) => '/auth/login',
    ),
    GoRoute(
      path: '/auth/login',
      pageBuilder: (context, state) => _buildPageWithTransition(
        context,
        state,
        const LoginScreen(),
      ),
    ),
    GoRoute(
      path: '/auth/register-type',
      pageBuilder: (context, state) => _buildPageWithTransition(
        context,
        state,
        const RegisterTypeScreen(),
      ),
    ),
    GoRoute(
      path: '/auth/register',
      pageBuilder: (context, state) {
        final userType = state.uri.queryParameters['type'] ?? 
            AppConstants.userTypeOwner;
        return _buildPageWithTransition(
          context,
          state,
          RegisterScreen(userType: userType),
        );
      },
    ),

    // Owner Routes
    GoRoute(
      path: '/owner',
      redirect: (context, state) => '/owner/home',
    ),
    GoRoute(
      path: '/owner/home',
      pageBuilder: (context, state) => _buildPageWithTransition(
        context, 
        state, 
        const OwnerMainScreen(), // Nova tela container com BottomBar
      ),
    ),
    // TODO: Implementar outras rotas do Owner conforme necessário
    // GoRoute(
    //   path: '/owner/vet/:id',
    //   builder: (context, state) {
    //     final vetId = state.pathParameters['id']!;
    //     return VetDetailScreen(vetId: vetId);
    //   },
    // ),

    // Vet Routes
    GoRoute(
      path: '/vet',
      redirect: (context, state) => '/vet/dashboard',
    ),
    // TODO: Implementar telas do Vet
    // GoRoute(
    //   path: '/vet/dashboard',
    //   builder: (context, state) => const VetDashboardScreen(),
    // ),
  ],
  
  errorBuilder: (context, state) => Scaffold(
    body: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.error_outline, size: 64, color: Colors.red),
          const SizedBox(height: 16),
          Text(
            'Página não encontrada',
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          const SizedBox(height: 8),
          TextButton(
            onPressed: () => context.go('/'),
            child: const Text('Voltar para início'),
          ),
        ],
      ),
    ),
  ),
);
