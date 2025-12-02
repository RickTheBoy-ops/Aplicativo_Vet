import 'package:equatable/equatable.dart';

/// Modelo de Animal
class AnimalModel extends Equatable {

  const AnimalModel({
    required this.id,
    required this.ownerId,
    required this.name,
    required this.species,
    required this.createdAt, this.breed,
    this.age,
    this.gender,
    this.weight,
    this.photoUrl,
    this.medicalHistory,
    this.allergies,
    this.updatedAt,
  });

  factory AnimalModel.fromJson(Map<String, dynamic> json) => AnimalModel(
      id: json['id'] as String,
      ownerId: json['ownerId'] as String,
      name: json['name'] as String,
      species: json['species'] as String,
      breed: json['breed'] as String?,
      age: json['age'] as int?,
      gender: json['gender'] as String?,
      weight: json['weight'] != null
          ? (json['weight'] as num).toDouble()
          : null,
      photoUrl: json['photoUrl'] as String?,
      medicalHistory: json['medicalHistory'] as String?,
      allergies: json['allergies'] != null
          ? List<String>.from(json['allergies'] as List)
          : null,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: json['updatedAt'] != null
          ? DateTime.parse(json['updatedAt'] as String)
          : null,
    );
  final String id;
  final String ownerId;
  final String name;
  final String species; // Cachorro, Gato, etc
  final String? breed;
  final int? age; // em anos
  final String? gender; // 'male', 'female'
  final double? weight; // em kg
  final String? photoUrl;
  final String? medicalHistory;
  final List<String>? allergies;
  final DateTime createdAt;
  final DateTime? updatedAt;

  Map<String, dynamic> toJson() => {
      'id': id,
      'ownerId': ownerId,
      'name': name,
      'species': species,
      'breed': breed,
      'age': age,
      'gender': gender,
      'weight': weight,
      'photoUrl': photoUrl,
      'medicalHistory': medicalHistory,
      'allergies': allergies,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };

  AnimalModel copyWith({
    String? id,
    String? ownerId,
    String? name,
    String? species,
    String? breed,
    int? age,
    String? gender,
    double? weight,
    String? photoUrl,
    String? medicalHistory,
    List<String>? allergies,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) => AnimalModel(
      id: id ?? this.id,
      ownerId: ownerId ?? this.ownerId,
      name: name ?? this.name,
      species: species ?? this.species,
      breed: breed ?? this.breed,
      age: age ?? this.age,
      gender: gender ?? this.gender,
      weight: weight ?? this.weight,
      photoUrl: photoUrl ?? this.photoUrl,
      medicalHistory: medicalHistory ?? this.medicalHistory,
      allergies: allergies ?? this.allergies,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );

  @override
  List<Object?> get props => [
        id,
        ownerId,
        name,
        species,
        breed,
        age,
        gender,
        weight,
        photoUrl,
        medicalHistory,
        allergies,
        createdAt,
        updatedAt,
      ];
}
