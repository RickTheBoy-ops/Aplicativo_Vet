import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vetfield_flutter/presentation/navigation/app_router.dart';
import 'package:vetfield_flutter/providers/auth_provider.dart';
import 'package:vetfield_flutter/providers/vet_provider.dart';
import 'package:vetfield_flutter/providers/booking_provider.dart';
import 'package:vetfield_flutter/features/diagnosis/presentation/diagnosis_controller.dart';

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
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'VetField Pro',
      routerConfig: appRouter,
      debugShowCheckedModeBanner: false,
    );
  }
}
