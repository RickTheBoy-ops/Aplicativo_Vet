class HistoryEvent { // 'consultation', 'exam', 'vaccine'

  HistoryEvent({
    required this.id,
    required this.title,
    required this.description,
    required this.date,
    required this.type, this.imageUrl,
  });
  final String id;
  final String title;
  final String description;
  final DateTime date;
  final String? imageUrl;
  final String type;
}
