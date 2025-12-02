import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import 'presentation/navigation/app_router.dart';
import 'providers/auth_provider.dart';
import 'providers/booking_provider.dart';
import 'providers/vet_provider.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => VetProvider()),
        ChangeNotifierProvider(create: (_) => BookingProvider()),
      ],
      child: Builder(
        builder: (context) {
          final authProvider = Provider.of<AuthProvider>(
            context,
            listen: false,
          );
          return VetFieldApp(router: createAppRouter(authProvider));
        },
      ),
    ),
  );
}

class VetFieldApp extends StatelessWidget {
  const VetFieldApp({required this.router, super.key});

  final GoRouter router;

  @override
  Widget build(BuildContext context) => MaterialApp.router(
      title: 'VetField Pro',
      routerConfig: router,
      debugShowCheckedModeBanner: false,
    );
}
