import 'dart:async';
import 'dart:math';

class VitalSigns {
  final int heartRate;
  final double temperature;
  final int activityLevel; // 0-100
  final DateTime timestamp;

  VitalSigns({
    required this.heartRate,
    required this.temperature,
    required this.activityLevel,
    required this.timestamp,
  });
}

class MonitoringService {
  final _random = Random();

  Stream<VitalSigns> get vitalSignsStream async* {
    while (true) {
      await Future.delayed(const Duration(seconds: 2));
      yield VitalSigns(
        heartRate: 60 + _random.nextInt(40), // 60-100 bpm
        temperature: 38.0 + _random.nextDouble(), // 38.0-39.0 C
        activityLevel: _random.nextInt(100),
        timestamp: DateTime.now(),
      );
    }
  }
}
