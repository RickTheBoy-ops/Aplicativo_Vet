import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import '../data/monitoring_service.dart';

class MonitoringScreen extends StatefulWidget {
  const MonitoringScreen({super.key});

  @override
  State<MonitoringScreen> createState() => _MonitoringScreenState();
}

class _MonitoringScreenState extends State<MonitoringScreen> {
  final MonitoringService _service = MonitoringService();
  final List<VitalSigns> _history = [];

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text('Monitoramento em Tempo Real')),
        body: StreamBuilder<VitalSigns>(
          stream: _service.vitalSignsStream,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              _history.add(snapshot.data!);
              if (_history.length > 20) {
                _history.removeAt(0);
              }
            }

            final current = snapshot.data;

            return ListView(
              padding: const EdgeInsets.all(16),
              children: [
                if (current != null) ...[
                  _buildStatusCard(
                    context,
                    'Frequência Cardíaca',
                    '${current.heartRate} bpm',
                    Icons.favorite,
                    Colors.red,
                    current.heartRate > 90 ? 'Alerta' : 'Normal',
                  ),
                  _buildStatusCard(
                    context,
                    'Temperatura',
                    '${current.temperature.toStringAsFixed(1)} °C',
                    Icons.thermostat,
                    Colors.orange,
                    current.temperature > 39.0 ? 'Febre' : 'Normal',
                  ),
                  _buildStatusCard(
                    context,
                    'Atividade',
                    '${current.activityLevel}%',
                    Icons.directions_run,
                    Colors.blue,
                    'Monitorando',
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    'Histórico Cardíaco (Últimos segundos)',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                  ),
                  const SizedBox(height: 16),
                  SizedBox(
                    height: 200,
                    child: LineChart(
                      LineChartData(
                        gridData: const FlGridData(show: false),
                        titlesData: const FlTitlesData(show: false),
                        borderData: FlBorderData(
                          show: true,
                          border: Border.all(color: Colors.grey.shade300),
                        ),
                        minY: 40,
                        maxY: 120,
                        lineBarsData: [
                          LineChartBarData(
                            spots: _history
                                .asMap()
                                .entries
                                .map(
                                  (e) => FlSpot(
                                    e.key.toDouble(),
                                    e.value.heartRate.toDouble(),
                                  ),
                                )
                                .toList(),
                            isCurved: true,
                            color: Colors.red,
                            barWidth: 3,
                            dotData: const FlDotData(show: false),
                            belowBarData: BarAreaData(
                              show: true,
                              color: Colors.red.withAlpha(13),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ] else
                  const Center(child: CircularProgressIndicator()),
              ],
            );
          },
        ),
      );

  Widget _buildStatusCard(
    BuildContext context,
    String title,
    String value,
    IconData icon,
    Color color,
    String status,
  ) =>
      Card(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              CircleAvatar(
                backgroundColor: color.withAlpha(26),
                radius: 24,
                child: Icon(icon, color: color),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title, style: const TextStyle(color: Colors.grey)),
                    Text(
                      value,
                      style: const TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 6,
                ),
                decoration: BoxDecoration(
                  color: status == 'Alerta' || status == 'Febre'
                      ? Colors.red.withAlpha(26)
                      : Colors.green.withAlpha(26),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  status,
                  style: TextStyle(
                    color: status == 'Alerta' || status == 'Febre'
                        ? Colors.red
                        : Colors.green,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
        ),
      );
}
