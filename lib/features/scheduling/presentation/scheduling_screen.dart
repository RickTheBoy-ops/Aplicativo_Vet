import 'package:flutter/material.dart';

class SchedulingScreen extends StatefulWidget {
  const SchedulingScreen({super.key});

  @override
  State<SchedulingScreen> createState() => _SchedulingScreenState();
}

class _SchedulingScreenState extends State<SchedulingScreen> {
  bool _isLoading = false;
  List<String>? _suggestions;

  void _getAiSuggestions() async {
    setState(() => _isLoading = true);
    await Future<void>.delayed(const Duration(seconds: 2)); // Mock AI delay
    setState(() {
      _isLoading = false;
      _suggestions = [
        'Segunda-feira, 14:00 (Melhor Rota)',
        'Terça-feira, 09:00 (Perto de outro cliente)',
        'Quarta-feira, 16:00',
      ];
    });
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text('Agendamento Inteligente')),
        body: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const TextField(
                decoration: InputDecoration(labelText: 'Cliente / Animal'),
              ),
              const SizedBox(height: 16),
              const TextField(
                decoration: InputDecoration(labelText: 'Motivo da Consulta'),
              ),
              const SizedBox(height: 16),
              const TextField(
                decoration: InputDecoration(labelText: 'Região / Endereço'),
              ),
              const SizedBox(height: 24),
              ElevatedButton.icon(
                onPressed: _isLoading ? null : _getAiSuggestions,
                icon: _isLoading
                    ? const SizedBox(
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          color: Colors.white,
                        ),
                      )
                    : const Icon(Icons.auto_awesome),
                label: const Text('Sugerir Horários com IA'),
              ),
              const SizedBox(height: 24),
              if (_suggestions != null) ...[
                const Text(
                  'Sugestões da IA:',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                ),
                const SizedBox(height: 16),
                ..._suggestions!.map(
                  (s) => Card(
                    color: s.contains('Melhor Rota') ? Colors.green[50] : null,
                    child: ListTile(
                      leading: const Icon(Icons.access_time),
                      title: Text(s),
                      trailing: const Icon(Icons.arrow_forward),
                      onTap: () {},
                    ),
                  ),
                ),
              ],
            ],
          ),
        ),
      );
}
