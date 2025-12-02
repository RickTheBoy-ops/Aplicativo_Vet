import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class TelemedicineScreen extends StatelessWidget {
  const TelemedicineScreen({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(
      appBar: AppBar(title: const Text('Telemedicina')),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: 3,
        itemBuilder: (context, index) => Card(
            margin: const EdgeInsets.only(bottom: 16),
            child: ListTile(
              leading: const CircleAvatar(
                backgroundImage: NetworkImage('https://placekitten.com/50/50'), // Placeholder
              ),
              title: Text('Consulta #${100 + index}'),
              subtitle: const Text('Paciente: Rex • Hoje, 14:00'),
              trailing: ElevatedButton(
                onPressed: () => context.go('/telemedicine/call'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  foregroundColor: Colors.white,
                ),
                child: const Text('Entrar'),
              ),
            ),
          ),
      ),
    );
}
