import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'core/theme/app_theme.dart';
import 'providers/auth_provider.dart';
import 'providers/vet_provider.dart';
import 'providers/booking_provider.dart';
import 'presentation/navigation/app_router.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // TODO: Inicializar Firebase
  // await Firebase.initializeApp();
  
  // TODO: Inicializar Hive
  // await Hive.initFlutter();
  
  runApp(const VetFieldApp());
}

class VetFieldApp extends StatelessWidget {
  const VetFieldApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => VetProvider()),
        ChangeNotifierProvider(create: (_) => BookingProvider()),
        // TODO: Adicionar outros providers
        // ChangeNotifierProvider(create: (_) => LocationProvider()),
      ],
      child: MaterialApp.router(
        title: 'VetField',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.lightTheme,
        routerConfig: appRouter,
      ),
    );
  }
}
