import 'package:flutter/material.dart';

class AnalyticsScreen extends StatelessWidget {
  const AnalyticsScreen({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(
      appBar: AppBar(title: const Text('Relatórios e Analytics')),
      body: const Center(
        child: Text('Gráficos de Faturamento e Atendimentos (Mock)'),
      ),
    );
}
