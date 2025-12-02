class HistoryEvent {
  final String id;
  final String title;
  final String description;
  final DateTime date;
  final String? imageUrl;
  final String type; // 'consultation', 'exam', 'vaccine'

  HistoryEvent({
    required this.id,
    required this.title,
    required this.description,
    required this.date,
    this.imageUrl,
    required this.type,
  });
}
