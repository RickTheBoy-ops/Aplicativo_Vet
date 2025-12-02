import 'package:equatable/equatable.dart';

/// Modelo de usuário
class UserModel extends Equatable {

  const UserModel({
    required this.id,
    required this.name,
    required this.email,
    required this.userType, required this.createdAt, this.phone,
    this.avatarUrl,
    this.updatedAt,
    this.cpf,
    this.address,
    this.city,
    this.state,
    this.zipCode,
    this.crmv,
    this.bio,
    this.specialties,
    this.rating,
    this.totalReviews,
    this.latitude,
    this.longitude,
    this.subscriptionPlan,
    this.isAvailable,
  });

  /// Create UserModel from JSON
  factory UserModel.fromJson(Map<String, dynamic> json) => UserModel(
      id: json['id'] as String,
      name: json['name'] as String,
      email: json['email'] as String,
      phone: json['phone'] as String?,
      avatarUrl: json['avatarUrl'] as String?,
      userType: json['userType'] as String,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: json['updatedAt'] != null
          ? DateTime.parse(json['updatedAt'] as String)
          : null,
      cpf: json['cpf'] as String?,
      address: json['address'] as String?,
      city: json['city'] as String?,
      state: json['state'] as String?,
      zipCode: json['zipCode'] as String?,
      crmv: json['crmv'] as String?,
      bio: json['bio'] as String?,
      specialties: json['specialties'] != null
          ? List<String>.from(json['specialties'] as List)
          : null,
      rating: 
          json['rating'] != null ? (json['rating'] as num).toDouble() : null,
      totalReviews: json['totalReviews'] as int?,
      latitude: json['latitude'] != null 
          ? (json['latitude'] as num).toDouble() 
          : null,
      longitude: json['longitude'] != null 
          ? (json['longitude'] as num).toDouble() 
          : null,
      subscriptionPlan: json['subscriptionPlan'] as String?,
      isAvailable: json['isAvailable'] as bool?,
    );
  final String id;
  final String name;
  final String email;
  final String? phone;
  final String? avatarUrl;
  final String userType; // 'owner' or 'vet'
  final DateTime createdAt;
  final DateTime? updatedAt;

  // Owner specific fields
  final String? cpf;
  final String? address;
  final String? city;
  final String? state;
  final String? zipCode;

  // Vet specific fields
  final String? crmv;
  final String? bio;
  final List<String>? specialties;
  final double? rating;
  final int? totalReviews;
  final double? latitude;
  final double? longitude;
  final String? subscriptionPlan;
  final bool? isAvailable;

  /// Convert UserModel to JSON
  Map<String, dynamic> toJson() => {
      'id': id,
      'name': name,
      'email': email,
      'phone': phone,
      'avatarUrl': avatarUrl,
      'userType': userType,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
      'cpf': cpf,
      'address': address,
      'city': city,
      'state': state,
      'zipCode': zipCode,
      'crmv': crmv,
      'bio': bio,
      'specialties': specialties,
      'rating': rating,
      'totalReviews': totalReviews,
      'latitude': latitude,
      'longitude': longitude,
      'subscriptionPlan': subscriptionPlan,
      'isAvailable': isAvailable,
    };

  /// Create a copy with modified fields
  UserModel copyWith({
    String? id,
    String? name,
    String? email,
    String? phone,
    String? avatarUrl,
    String? userType,
    DateTime? createdAt,
    DateTime? updatedAt,
    String? cpf,
    String? address,
    String? city,
    String? state,
    String? zipCode,
    String? crmv,
    String? bio,
    List<String>? specialties,
    double? rating,
    int? totalReviews,
    double? latitude,
    double? longitude,
    String? subscriptionPlan,
    bool? isAvailable,
  }) => UserModel(
      id: id ?? this.id,
      name: name ?? this.name,
      email: email ?? this.email,
      phone: phone ?? this.phone,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      userType: userType ?? this.userType,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      cpf: cpf ?? this.cpf,
      address: address ?? this.address,
      city: city ?? this.city,
      state: state ?? this.state,
      zipCode: zipCode ?? this.zipCode,
      crmv: crmv ?? this.crmv,
      bio: bio ?? this.bio,
      specialties: specialties ?? this.specialties,
      rating: rating ?? this.rating,
      totalReviews: totalReviews ?? this.totalReviews,
      latitude: latitude ?? this.latitude,
      longitude: longitude ?? this.longitude,
      subscriptionPlan: subscriptionPlan ?? this.subscriptionPlan,
      isAvailable: isAvailable ?? this.isAvailable,
    );

  bool get isOwner => userType == 'owner';
  bool get isVet => userType == 'vet';

  @override
  List<Object?> get props => [
        id,
        name,
        email,
        phone,
        avatarUrl,
        userType,
        createdAt,
        updatedAt,
        cpf,
        address,
        city,
        state,
        zipCode,
        crmv,
        bio,
        specialties,
        rating,
        totalReviews,
        latitude,
        longitude,
        subscriptionPlan,
        isAvailable,
      ];
}
