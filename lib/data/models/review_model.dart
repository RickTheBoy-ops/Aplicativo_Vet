import 'package:equatable/equatable.dart';
import 'user_model.dart';

/// Modelo de Avaliação/Review
class ReviewModel extends Equatable {
  final String id;
  final String vetId;
  final String ownerId;
  final String bookingId;
  final int rating; // 1-5
  final String? comment;
  final DateTime createdAt;
  final DateTime? updatedAt;
  
  // Related objects
  final UserModel? owner;

  const ReviewModel({
    required this.id,
    required this.vetId,
    required this.ownerId,
    required this.bookingId,
    required this.rating,
    this.comment,
    required this.createdAt,
    this.updatedAt,
    this.owner,
  });

  factory ReviewModel.fromJson(Map<String, dynamic> json) {
    return ReviewModel(
      id: json['id'] as String,
      vetId: json['vetId'] as String,
      ownerId: json['ownerId'] as String,
      bookingId: json['bookingId'] as String,
      rating: json['rating'] as int,
      comment: json['comment'] as String?,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: json['updatedAt'] != null
          ? DateTime.parse(json['updatedAt'] as String)
          : null,
      owner: json['owner'] != null
          ? UserModel.fromJson(json['owner'] as Map<String, dynamic>)
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'vetId': vetId,
      'ownerId': ownerId,
      'bookingId': bookingId,
      'rating': rating,
      'comment': comment,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
      if (owner != null) 'owner': owner!.toJson(),
    };
  }

  ReviewModel copyWith({
    String? id,
    String? vetId,
    String? ownerId,
    String? bookingId,
    int? rating,
    String? comment,
    DateTime? createdAt,
    DateTime? updatedAt,
    UserModel? owner,
  }) {
    return ReviewModel(
      id: id ?? this.id,
      vetId: vetId ?? this.vetId,
      ownerId: ownerId ?? this.ownerId,
      bookingId: bookingId ?? this.bookingId,
      rating: rating ?? this.rating,
      comment: comment ?? this.comment,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      owner: owner ?? this.owner,
    );
  }

  @override
  List<Object?> get props => [
        id,
        vetId,
        ownerId,
        bookingId,
        rating,
        comment,
        createdAt,
        updatedAt,
        owner,
      ];
}
