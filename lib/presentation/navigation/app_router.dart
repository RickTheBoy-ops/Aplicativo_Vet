import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../presentation/screens/auth/splash_screen.dart';
import '../presentation/screens/auth/login_screen.dart';
import '../presentation/screens/auth/register_type_screen.dart';
import '../presentation/screens/auth/register_screen.dart';
import '../core/constants/app_constants.dart';

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
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/auth/register-type',
      builder: (context, state) => const RegisterTypeScreen(),
    ),
    GoRoute(
      path: '/auth/register',
      builder: (context, state) {
        final userType = state.uri.queryParameters['type'] ?? 
            AppConstants.userTypeOwner;
        return RegisterScreen(userType: userType);
      },
    ),
    // TODO: Adicionar ForgotPasswordScreen
    // GoRoute(
    //   path: '/auth/forgot-password',
    //   builder: (context, state) => const ForgotPasswordScreen(),
    // ),

    // Owner Routes
    GoRoute(
      path: '/owner',
      redirect: (context, state) => '/owner/home',
    ),
    // TODO: Implementar telas do Owner
    // GoRoute(
    //   path: '/owner/home',
    //   builder: (context, state) => const OwnerHomeScreen(),
    // ),
    // GoRoute(
    //   path: '/owner/search',
    //   builder: (context, state) => const SearchVetScreen(),
    // ),
    // GoRoute(
    //   path: '/owner/vet/:id',
    //   builder: (context, state) {
    //     final vetId = state.pathParameters['id']!;
    //     return VetDetailScreen(vetId: vetId);
    //   },
    // ),
    // GoRoute(
    //   path: '/owner/booking',
    //   builder: (context, state) => const BookingScreen(),
    // ),
    // GoRoute(
    //   path: '/owner/my-bookings',
    //   builder: (context, state) => const MyBookingsScreen(),
    // ),
    // GoRoute(
    //   path: '/owner/animals',
    //   builder: (context, state) => const AnimalManagementScreen(),
    // ),
    // GoRoute(
    //   path: '/owner/profile',
    //   builder: (context, state) => const OwnerProfileScreen(),
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
    // GoRoute(
    //   path: '/vet/appointments',
    //   builder: (context, state) => const AppointmentsScreen(),
    // ),
    // GoRoute(
    //   path: '/vet/availability',
    //   builder: (context, state) => const AvailabilityScreen(),
    // ),
    // GoRoute(
    //   path: '/vet/analytics',
    //   builder: (context, state) => const AnalyticsScreen(),
    // ),
    // GoRoute(
    //   path: '/vet/subscription',
    //   builder: (context, state) => const SubscriptionScreen(),
    // ),
    // GoRoute(
    //   path: '/vet/profile',
    //   builder: (context, state) => const VetProfileScreen(),
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
