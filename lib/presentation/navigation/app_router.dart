import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../core/constants/app_constants.dart';
import '../../data/models/user_model.dart';
// New Features Imports
import '../../features/diagnosis/presentation/diagnosis_screen.dart';
import '../../features/management/presentation/analytics_screen.dart';
import '../../features/management/presentation/management_screen.dart';
import '../../features/management/presentation/payments_screen.dart';
import '../../features/medical_history/presentation/history_screen.dart';
import '../../features/monitoring/presentation/monitoring_screen.dart';
import '../../features/prescription/presentation/prescription_screen.dart';
import '../../features/scheduling/presentation/scheduling_screen.dart';
import '../../features/telemedicine/presentation/telemedicine_screen.dart';
import '../../features/telemedicine/presentation/video_call_screen.dart';
import '../../providers/auth_provider.dart';
import '../screens/auth/login_screen.dart';
import '../screens/auth/register_screen.dart';
import '../screens/auth/register_type_screen.dart';
import '../screens/auth/splash_screen.dart';
import '../screens/owner/owner_main_screen.dart';
import '../screens/owner/vet_detail_screen.dart';

/// Helper para transições suaves (Fade + Slide suave)
Page<dynamic> _buildPageWithTransition(
    BuildContext context, GoRouterState state, Widget child,) => CustomTransitionPage(
    key: state.pageKey,
    child: child,
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      const begin = Offset(1, 0);
      const end = Offset.zero;
      const curve = Curves.easeOutQuart;

      final slideTween =
          Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
      final fadeTween = Tween(begin: 0.0, end: 1.0);

      return SlideTransition(
        position: animation.drive(slideTween),
        child: FadeTransition(
          opacity: animation.drive(fadeTween),
          child: child,
        ),
      );
    },
  );

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
        final userType =
            state.uri.queryParameters['type'] ?? AppConstants.userTypeOwner;
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
    GoRoute(
      path: '/owner/vet/:id',
      pageBuilder: (context, state) {
        final vet = state.extra as UserModel?;
        return _buildPageWithTransition(
          context,
          state,
          vet != null
              ? VetDetailScreen(vet: vet)
              : Scaffold(
                  appBar: AppBar(title: const Text('Veterinário')),
                  body: const Center(
                      child: Text('Dados do veterinário indisponíveis'),),
                ),
        );
      },
    ),

    // ===== NEW FEATURES ROUTES =====
    // Diagnosis
    GoRoute(
      path: '/diagnosis',
      pageBuilder: (context, state) => _buildPageWithTransition(
        context,
        state,
        const DiagnosisScreen(),
      ),
    ),
    
    // Prescription
    GoRoute(
      path: '/prescription',
      pageBuilder: (context, state) => _buildPageWithTransition(
        context,
        state,
        const PrescriptionScreen(),
      ),
    ),
    
    // Telemedicine
    GoRoute(
      path: '/telemedicine',
      pageBuilder: (context, state) => _buildPageWithTransition(
        context,
        state,
        const TelemedicineScreen(),
      ),
      routes: [
        GoRoute(
          path: 'call',
          pageBuilder: (context, state) => _buildPageWithTransition(
            context,
            state,
            const VideoCallScreen(),
          ),
        ),
      ],
    ),
    
    // Medical History
    GoRoute(
      path: '/history',
      pageBuilder: (context, state) => _buildPageWithTransition(
        context,
        state,
        const HistoryScreen(),
      ),
    ),
    
    // Monitoring
    GoRoute(
      path: '/monitoring',
      pageBuilder: (context, state) => _buildPageWithTransition(
        context,
        state,
        const MonitoringScreen(),
      ),
    ),
    
    // Management
    GoRoute(
      path: '/management',
      pageBuilder: (context, state) => _buildPageWithTransition(
        context,
        state,
        const ManagementScreen(),
      ),
      routes: [
        GoRoute(
          path: 'analytics',
          pageBuilder: (context, state) => _buildPageWithTransition(
            context,
            state,
            const AnalyticsScreen(),
          ),
        ),
        GoRoute(
          path: 'payments',
          pageBuilder: (context, state) => _buildPageWithTransition(
            context,
            state,
            const PaymentsScreen(),
          ),
        ),
        GoRoute(
          path: 'scheduling',
          pageBuilder: (context, state) => _buildPageWithTransition(
            context,
            state,
            const SchedulingScreen(),
          ),
        ),
      ],
    ),

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