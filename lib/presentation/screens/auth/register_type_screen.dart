import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/constants/app_constants.dart';

/// Tela de seleção de tipo de usuário (Owner ou Vet)
class RegisterTypeScreen extends StatelessWidget {
  const RegisterTypeScreen({super.key});

  void _navigateToRegister(BuildContext context, String userType) {
    // TODO: Navigator.push ou context.go('/auth/register?type=$userType')
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Navegando para registro de $userType'),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: AppSpacing.screenPadding,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              AppSpacing.verticalSpacerXl,
              
              // Título
              Text(
                'Qual é o seu perfil?',
                style: AppTypography.h2.copyWith(
                  color: AppColors.text,
                ),
                textAlign: TextAlign.center,
              ),
              
              AppSpacing.verticalSpacerSm,
              
              Text(
                'Selecione como você deseja se cadastrar',
                style: AppTypography.body.copyWith(
                  color: AppColors.textSecondary,
                ),
                textAlign: TextAlign.center,
              ),
              
              const Spacer(),
              
              // Owner Card
              _UserTypeCard(
                title: 'Sou Dono de Pet',
                description: 'Busco veterinários para cuidar do meu animal',
                icon: Icons.person_outline,
                gradient: AppColors.primaryGradient,
                onTap: () => _navigateToRegister(
                  context,
                  AppConstants.userTypeOwner,
                ),
              ),
              
              AppSpacing.verticalSpacerXl,
              
              // Vet Card
              _UserTypeCard(
                title: 'Sou Veterinário',
                description: 'Ofereço serviços veterinários em campo',
                icon: Icons.medical_services_outlined,
                gradient: AppColors.successGradient,
                onTap: () => _navigateToRegister(
                  context,
                  AppConstants.userTypeVet,
                ),
              ),
              
              const Spacer(),
              
              // Back to Login
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Já tem uma conta? ',
                    style: AppTypography.body.copyWith(
                      color: AppColors.textSecondary,
                    ),
                  ),
                  TextButton(
                    onPressed: () => Navigator.of(context).pop(),
                    child: Text(
                      'Entrar',
                      style: AppTypography.bodyMedium.copyWith(
                        color: AppColors.primary,
                      ),
                    ),
                  ),
                ],
              ),
              
              AppSpacing.verticalSpacerMd,
            ],
          ),
        ),
      ),
    );
  }
}

class _UserTypeCard extends StatelessWidget {
  final String title;
  final String description;
  final IconData icon;
  final List<Color> gradient;
  final VoidCallback onTap;

  const _UserTypeCard({
    required this.title,
    required this.description,
    required this.icon,
    required this.gradient,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: AppSpacing.borderRadiusLg,
      child: Container(
        padding: AppSpacing.paddingXl,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: gradient,
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: AppSpacing.borderRadiusLg,
          boxShadow: [
            BoxShadow(
              color: gradient.first.withOpacity(0.3),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: AppColors.white.withOpacity(0.2),
                shape: BoxShape.circle,
              ),
              child: Icon(
                icon,
                size: 40,
                color: AppColors.white,
              ),
            ),
            
            AppSpacing.verticalSpacerMd,
            
            Text(
              title,
              style: AppTypography.h3.copyWith(
                color: AppColors.white,
              ),
              textAlign: TextAlign.center,
            ),
            
            AppSpacing.verticalSpacerSm,
            
            Text(
              description,
              style: AppTypography.body.copyWith(
                color: AppColors.white.withOpacity(0.9),
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
