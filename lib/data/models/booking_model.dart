import 'package:equatable/equatable.dart';
import 'user_model.dart';
import 'animal_model.dart';

/// Modelo de Agendamento/Booking
class BookingModel extends Equatable {
  final String id;
  final String ownerId;
  final String vetId;
  final String animalId;
  final DateTime scheduledDate;
  final String? description;
  final String status; // pending, confirmed, in_progress, completed, cancelled
  final double? price;
  final String? address;
  final double? latitude;
  final double? longitude;
  final DateTime createdAt;
  final DateTime? updatedAt;
  final DateTime? completedAt;
  final DateTime? cancelledAt;
  final String? cancellationReason;
  
  // Related objects (optional, loaded when needed)
  final UserModel? owner;
  final UserModel? vet;
  final AnimalModel? animal;

  const BookingModel({
    required this.id,
    required this.ownerId,
    required this.vetId,
    required this.animalId,
    required this.scheduledDate,
    this.description,
    required this.status,
    this.price,
    this.address,
    this.latitude,
    this.longitude,
    required this.createdAt,
    this.updatedAt,
    this.completedAt,
    this.cancelledAt,
    this.cancellationReason,
    this.owner,
    this.vet,
    this.animal,
  });

  factory BookingModel.fromJson(Map<String, dynamic> json) {
    return BookingModel(
      id: json['id'] as String,
      ownerId: json['ownerId'] as String,
      vetId: json['vetId'] as String,
      animalId: json['animalId'] as String,
      scheduledDate: DateTime.parse(json['scheduledDate'] as String),
      description: json['description'] as String?,
      status: json['status'] as String,
      price: json['price'] != null ? (json['price'] as num).toDouble() : null,
      address: json['address'] as String?,
      latitude: json['latitude'] != null 
          ? (json['latitude'] as num).toDouble() 
          : null,
      longitude: json['longitude'] != null 
          ? (json['longitude'] as num).toDouble() 
          : null,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: json['updatedAt'] != null
          ? DateTime.parse(json['updatedAt'] as String)
          : null,
      completedAt: json['completedAt'] != null
          ? DateTime.parse(json['completedAt'] as String)
          : null,
      cancelledAt: json['cancelledAt'] != null
          ? DateTime.parse(json['cancelledAt'] as String)
          : null,
      cancellationReason: json['cancellationReason'] as String?,
      owner: json['owner'] != null 
          ? UserModel.fromJson(json['owner'] as Map<String, dynamic>)
          : null,
      vet: json['vet'] != null 
          ? UserModel.fromJson(json['vet'] as Map<String, dynamic>)
          : null,
      animal: json['animal'] != null 
          ? AnimalModel.fromJson(json['animal'] as Map<String, dynamic>)
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'ownerId': ownerId,
      'vetId': vetId,
      'animalId': animalId,
      'scheduledDate': scheduledDate.toIso8601String(),
      'description': description,
      'status': status,
      'price': price,
      'address': address,
      'latitude': latitude,
      'longitude': longitude,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
      'completedAt': completedAt?.toIso8601String(),
      'cancelledAt': cancelledAt?.toIso8601String(),
      'cancellationReason': cancellationReason,
      if (owner != null) 'owner': owner!.toJson(),
      if (vet != null) 'vet': vet!.toJson(),
      if (animal != null) 'animal': animal!.toJson(),
    };
  }

  BookingModel copyWith({
    String? id,
    String? ownerId,
    String? vetId,
    String? animalId,
    DateTime? scheduledDate,
    String? description,
    String? status,
    double? price,
    String? address,
    double? latitude,
    double? longitude,
    DateTime? createdAt,
    DateTime? updatedAt,
    DateTime? completedAt,
    DateTime? cancelledAt,
    String? cancellationReason,
    UserModel? owner,
    UserModel? vet,
    AnimalModel? animal,
  }) {
    return BookingModel(
      id: id ?? this.id,
      ownerId: ownerId ?? this.ownerId,
      vetId: vetId ?? this.vetId,
      animalId: animalId ?? this.animalId,
      scheduledDate: scheduledDate ?? this.scheduledDate,
      description: description ?? this.description,
      status: status ?? this.status,
      price: price ?? this.price,
      address: address ?? this.address,
      latitude: latitude ?? this.latitude,
      longitude: longitude ?? this.longitude,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      completedAt: completedAt ?? this.completedAt,
      cancelledAt: cancelledAt ?? this.cancelledAt,
      cancellationReason: cancellationReason ?? this.cancellationReason,
      owner: owner ?? this.owner,
      vet: vet ?? this.vet,
      animal: animal ?? this.animal,
    );
  }

  bool get isPending => status == 'pending';
  bool get isConfirmed => status == 'confirmed';
  bool get isInProgress => status == 'in_progress';
  bool get isCompleted => status == 'completed';
  bool get isCancelled => status == 'cancelled';
  bool get isActive => status == 'confirmed' || status == 'in_progress';

  @override
  List<Object?> get props => [
        id,
        ownerId,
        vetId,
        animalId,
        scheduledDate,
        description,
        status,
        price,
        address,
        latitude,
        longitude,
        createdAt,
        updatedAt,
        completedAt,
        cancelledAt,
        cancellationReason,
        owner,
        vet,
        animal,
      ];
}
