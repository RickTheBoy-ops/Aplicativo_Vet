import 'package:flutter/material.dart';
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
      child: const VetFieldApp(),
    ),
  );
}

class VetFieldApp extends StatelessWidget {
  const VetFieldApp({super.key});

  @override
  Widget build(BuildContext context) => MaterialApp.router(
      title: 'VetField Pro',
      routerConfig: appRouter,
      debugShowCheckedModeBanner: false,
    );
}
