
import 'package:flutter/material.dart';

/// Represents a tappable area on the BodyMap.
class BodyPart {
  final String name;
  final Rect area;
  final String specialty;

  BodyPart({
    required this.name,
    required this.area,
    required this.specialty,
  });
}
