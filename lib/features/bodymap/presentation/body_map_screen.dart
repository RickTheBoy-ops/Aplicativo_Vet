ap
import 'package:flutter/material.dart';
import 'widgets/body_map_interactive.dart';

class BodyMapScreen extends StatelessWidget {
  const BodyMapScreen({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(
      appBar: AppBar(
        title: const Text('Mapa Corporal de Sintomas'),
      ),
      body: const Center(
        child: BodyMapInteractive(animalType: 'dog'),
      ),
    );
}
