import 'package:flutter/material.dart';
import '../theme/app_colors.dart';

void showSnackBar(
  BuildContext context,
  String message, {
  bool isError = false,
}) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text(
        message,
        style: const TextStyle(color: Colors.white),
      ),
      backgroundColor: isError ? Colors.red : AppColors.primary,
      behavior: SnackBarBehavior.floating,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      margin: const EdgeInsets.all(16),
    ),
  );
}

void showError(BuildContext context, String message) {
  showSnackBar(context, message, isError: true);
}

void showSuccess(BuildContext context, String message) {
  showSnackBar(context, message);
}
