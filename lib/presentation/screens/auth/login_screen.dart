import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/constants/app_constants.dart';
import '../../../providers/auth_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_input.dart';
import '../../widgets/common/loading_widget.dart';

/// Tela de Login
class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _handleLogin() async {
    if (!_formKey.currentState!.validate()) return;

    final authProvider = context.read<AuthProvider>();
    
    final success = await authProvider.login(
      email: _emailController.text.trim(),
      password: _passwordController.text,
    );

    if (!mounted) return;

    if (success) {
      // TODO: Navegar para home baseado no tipo de usuário
      // if (authProvider.isOwner) {
      //   context.go('/owner/home');
      // } else {
      //   context.go('/vet/dashboard');
      // }
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(AppConstants.loginSuccess),
          backgroundColor: AppColors.success,
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(authProvider.error ?? AppConstants.genericError),
          backgroundColor: AppColors.error,
        ),
      );
    }
  }

  void _navigateToRegister() {
    // TODO: Navigator.push ou context.go('/auth/register-type')
  }

  void _navigateToForgotPassword() {
    // TODO: Navigator.push ou context.go('/auth/forgot-password')
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Consumer<AuthProvider>(
          builder: (context, authProvider, child) {
            if (authProvider.isLoading) {
              return const LoadingWidget(message: 'Entrando...');
            }

            return SingleChildScrollView(
              padding: AppSpacing.screenPadding,
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    AppSpacing.verticalSpacerXxl,
                    AppSpacing.verticalSpacerXxl,
                    
                    // Logo
                    Center(
                      child: Container(
                        width: 100,
                        height: 100,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: LinearGradient(
                            colors: AppColors.heroGradient,
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                        ),
                        child: const Icon(
                          Icons.pets,
                          size: 50,
                          color: AppColors.white,
                        ),
                      ),
                    ),
                    
                    AppSpacing.verticalSpacerXl,
                    
                    // Título
                    Text(
                      'Bem-vindo ao VetField',
                      style: AppTypography.h2.copyWith(
                        color: AppColors.text,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    
                    AppSpacing.verticalSpacerSm,
                    
                    Text(
                      'Entre para continuar',
                      style: AppTypography.body.copyWith(
                        color: AppColors.textSecondary,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    
                    AppSpacing.verticalSpacerXxl,
                    
                    // Email Input
                    AppInput(
                      label: 'Email',
                      hint: 'seu@email.com',
                      controller: _emailController,
                      keyboardType: TextInputType.emailAddress,
                      prefixIcon: const Icon(Icons.email_outlined),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return AppConstants.requiredField;
                        }
                        if (!RegExp(AppConstants.emailPattern).hasMatch(value)) {
                          return AppConstants.invalidEmail;
                        }
                        return null;
                      },
                    ),
                    
                    AppSpacing.verticalSpacerLg,
                    
                    // Password Input
                    AppInput(
                      label: 'Senha',
                      hint: '••••••••',
                      controller: _passwordController,
                      obscureText: _obscurePassword,
                      prefixIcon: const Icon(Icons.lock_outlined),
                      suffixIcon: IconButton(
                        icon: Icon(
                          _obscurePassword
                              ? Icons.visibility_outlined
                              : Icons.visibility_off_outlined,
                        ),
                        onPressed: () {
                          setState(() {
                            _obscurePassword = !_obscurePassword;
                          });
                        },
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return AppConstants.requiredField;
                        }
                        if (value.length < 8) {
                          return AppConstants.passwordTooShort;
                        }
                        return null;
                      },
                    ),
                    
                    AppSpacing.verticalSpacerMd,
                    
                    // Forgot Password
                    Align(
                      alignment: Alignment.centerRight,
                      child: TextButton(
                        onPressed: _navigateToForgotPassword,
                        child: Text(
                          'Esqueceu a senha?',
                          style: AppTypography.bodyMedium.copyWith(
                            color: AppColors.primary,
                          ),
                        ),
                      ),
                    ),
                    
                    AppSpacing.verticalSpacerLg,
                    
                    // Login Button
                    AppButton(
                      text: 'Entrar',
                      onPressed: _handleLogin,
                    ),
                    
                    AppSpacing.verticalSpacerXl,
                    
                    // Divider
                    Row(
                      children: [
                        const Expanded(child: Divider()),
                        Padding(
                          padding: AppSpacing.paddingHorizontalMd,
                          child: Text(
                            'ou',
                            style: AppTypography.caption.copyWith(
                              color: AppColors.textLight,
                            ),
                          ),
                        ),
                        const Expanded(child: Divider()),
                      ],
                    ),
                    
                    AppSpacing.verticalSpacerXl,
                    
                    // Register Button
                    AppButton(
                      text: 'Criar uma conta',
                      onPressed: _navigateToRegister,
                      isOutlined: true,
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
