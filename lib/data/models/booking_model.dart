class BookingModel {

  BookingModel({
    required this.id,
    required this.vetId,
    required this.animalId,
    required this.scheduledDate,
    required this.status,
    this.description,
    this.address,
    this.latitude,
    this.longitude,
  });

  factory BookingModel.fromJson(Map<String, dynamic> json) => BookingModel(
      id: json['id'] as String,
      vetId: json['vetId'] as String,
      animalId: json['animalId'] as String,
      scheduledDate: DateTime.parse(json['scheduledDate'] as String),
      status: json['status'] as String,
      description: json['description'] as String?,
      address: json['address'] as String?,
      latitude: (json['latitude'] as num?)?.toDouble(),
      longitude: (json['longitude'] as num?)?.toDouble(),
    );
  final String id;
  final String vetId;
  final String animalId;
  final DateTime scheduledDate;
  final String? description;
  final String? address;
  final double? latitude;
  final double? longitude;
  final String status;

  Map<String, dynamic> toJson() => {
      'id': id,
      'vetId': vetId,
      'animalId': animalId,
      'scheduledDate': scheduledDate.toIso8601String(),
      'status': status,
      if (description != null) 'description': description,
      if (address != null) 'address': address,
      if (latitude != null) 'latitude': latitude,
      if (longitude != null) 'longitude': longitude,
    };

  bool get isPending => status == 'pending';
  bool get isConfirmed => status == 'confirmed';
  bool get isActive => status == 'active' || status == 'in_progress';
  bool get isCompleted => status == 'completed';
  bool get isCancelled => status == 'cancelled' || status == 'canceled';
}
