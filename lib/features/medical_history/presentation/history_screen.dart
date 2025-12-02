import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../domain/history_event_model.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Mock Data
    final events = [
      HistoryEvent(
        id: '1',
        title: 'Consulta de Rotina',
        description: 'Animal apresenta bom estado geral. Leve sobrepeso.',
        date: DateTime.now().subtract(const Duration(days: 2)),
        type: 'consultation',
      ),
      HistoryEvent(
        id: '2',
        title: 'Vacinação (V10)',
        description: 'Aplicação da dose anual.',
        date: DateTime.now().subtract(const Duration(days: 30)),
        type: 'vaccine',
      ),
      HistoryEvent(
        id: '3',
        title: 'Exame de Sangue',
        description: 'Hemograma completo. Resultados normais.',
        date: DateTime.now().subtract(const Duration(days: 35)),
        imageUrl: 'https://placehold.co/600x400/png',
        type: 'exam',
      ),
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Histórico Clínico')),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: const Icon(Icons.add),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: events.length,
        itemBuilder: (context, index) {
          final event = events[index];
          return _TimelineItem(event: event, isLast: index == events.length - 1);
        },
      ),
    );
  }
}

class _TimelineItem extends StatelessWidget {

  const _TimelineItem({required this.event, required this.isLast});
  final HistoryEvent event;
  final bool isLast;

  @override
  Widget build(BuildContext context) => IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Timeline Line & Dot
          Column(
            children: [
              Container(
                width: 16,
                height: 16,
                decoration: BoxDecoration(
                  color: Theme.of(context).primaryColor,
                  shape: BoxShape.circle,
                  border: Border.all(color: Colors.white, width: 2),
                  boxShadow: [
                    BoxShadow(color: Colors.grey.withOpacity(0.5), blurRadius: 4),
                  ],
                ),
              ),
              if (!isLast)
                Expanded(
                  child: Container(
                    width: 2,
                    color: Colors.grey[300],
                  ),
                ),
            ],
          ),
          const SizedBox(width: 16),
          // Content
          Expanded(
            child: Padding(
              padding: const EdgeInsets.only(bottom: 24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    DateFormat('dd/MM/yyyy').format(event.date),
                    style: TextStyle(color: Colors.grey[600], fontSize: 12),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    event.title,
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                  ),
                  const SizedBox(height: 8),
                  Card(
                    margin: EdgeInsets.zero,
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(event.description),
                          if (event.imageUrl != null) ...[
                            const SizedBox(height: 8),
                            ClipRRect(
                              borderRadius: BorderRadius.circular(8),
                              child: Image.network(
                                event.imageUrl!,
                                height: 120,
                                width: double.infinity,
                                fit: BoxFit.cover,
                                errorBuilder: (c, e, s) => Container(
                                  height: 120,
                                  color: Colors.grey[200],
                                  child: const Center(child: Icon(Icons.broken_image)),
                                ),
                              ),
                            ),
                          ],
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
}
