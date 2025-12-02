import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../core/constants/app_constants.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../providers/auth_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_input.dart';
import '../../widgets/common/loading_widget.dart';

/// Tela de Registro
class RegisterScreen extends StatefulWidget { // 'owner' or 'vet'

  const RegisterScreen({
    required this.userType, super.key,
  });
  final String userType;

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _cpfController = TextEditingController();
  final _crmvController = TextEditingController();
  
  bool _obscurePassword = true;
  bool _obscureConfirmPassword = true;

  bool get _isOwner => widget.userType == AppConstants.userTypeOwner;
  bool get _isVet => widget.userType == AppConstants.userTypeVet;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    _cpfController.dispose();
    _crmvController.dispose();
    super.dispose();
  }

  Future<void> _handleRegister() async {
    if (!_formKey.currentState!.validate()) return;

    final authProvider = context.read<AuthProvider>();
    
    final success = await authProvider.register(
      name: _nameController.text.trim(),
      email: _emailController.text.trim(),
      password: _passwordController.text,
      userType: widget.userType,
      phone: _phoneController.text.trim().isNotEmpty 
          ? _phoneController.text.trim() 
          : null,
      cpf: _isOwner && _cpfController.text.trim().isNotEmpty
          ? _cpfController.text.trim()
          : null,
      crmv: _isVet && _crmvController.text.trim().isNotEmpty
          ? _crmvController.text.trim()
          : null,
    );

    if (!mounted) return;

    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(AppConstants.registerSuccess),
          backgroundColor: AppColors.success,
        ),
      );
      // TODO: Navegar para home
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(authProvider.error ?? AppConstants.genericError),
          backgroundColor: AppColors.error,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) => Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text(
          _isOwner ? 'Cadastro de Proprietário' : 'Cadastro de Veterinário',
        ),
      ),
      body: SafeArea(
        child: Consumer<AuthProvider>(
          builder: (context, authProvider, child) {
            if (authProvider.isLoading) {
              return const LoadingWidget(message: 'Criando conta...');
            }

            return SingleChildScrollView(
              padding: AppSpacing.screenPadding,
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    AppSpacing.verticalSpacerMd,
                    
                    // Icon
                    Center(
                      child: Container(
                        width: 80,
                        height: 80,
                        decoration: BoxDecoration(
                          color: _isOwner 
                              ? AppColors.primary.withOpacity(0.1)
                              : AppColors.success.withOpacity(0.1),
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          _isOwner 
                              ? Icons.person_outline 
                              : Icons.medical_services_outlined,
                          size: 40,
                          color: _isOwner ? AppColors.primary : AppColors.success,
                        ),
                      ),
                    ),
                    
                    AppSpacing.verticalSpacerXl,
                    
                    // Nome
                    AppInput(
                      label: 'Nome completo',
                      hint: 'Seu nome',
                      controller: _nameController,
                      prefixIcon: const Icon(Icons.person_outline),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return AppConstants.requiredField;
                        }
                        return null;
                      },
                    ),
                    
                    AppSpacing.verticalSpacerLg,
                    
                    // Email
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
                    
                    // Telefone
                    AppInput(
                      label: 'Telefone',
                      hint: '(11) 99999-9999',
                      controller: _phoneController,
                      keyboardType: TextInputType.phone,
                      prefixIcon: const Icon(Icons.phone_outlined),
                      validator: (value) {
                        if (value != null && value.isNotEmpty) {
                          if (!RegExp(AppConstants.phonePattern).hasMatch(value)) {
                            return AppConstants.invalidPhone;
                          }
                        }
                        return null;
                      },
                    ),
                    
                    AppSpacing.verticalSpacerLg,
                    
                    // CPF (Owner only)
                    if (_isOwner) ...[
                      AppInput(
                        label: 'CPF',
                        hint: '000.000.000-00',
                        controller: _cpfController,
                        keyboardType: TextInputType.number,
                        prefixIcon: const Icon(Icons.badge_outlined),
                        validator: (value) {
                          if (value != null && value.isNotEmpty) {
                            if (!RegExp(AppConstants.cpfPattern).hasMatch(value)) {
                              return AppConstants.invalidCPF;
                            }
                          }
                          return null;
                        },
                      ),
                      AppSpacing.verticalSpacerLg,
                    ],
                    
                    // CRMV (Vet only)
                    if (_isVet) ...[
                      AppInput(
                        label: 'CRMV',
                        hint: 'SP-12345',
                        controller: _crmvController,
                        prefixIcon: const Icon(Icons.badge_outlined),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return AppConstants.requiredField;
                          }
                          if (!RegExp(AppConstants.crmvPattern).hasMatch(value)) {
                            return AppConstants.invalidCRMV;
                          }
                          return null;
                        },
                      ),
                      AppSpacing.verticalSpacerLg,
                    ],
                    
                    // Senha
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
                    
                    AppSpacing.verticalSpacerLg,
                    
                    // Confirmar Senha
                    AppInput(
                      label: 'Confirmar senha',
                      hint: '••••••••',
                      controller: _confirmPasswordController,
                      obscureText: _obscureConfirmPassword,
                      prefixIcon: const Icon(Icons.lock_outlined),
                      suffixIcon: IconButton(
                        icon: Icon(
                          _obscureConfirmPassword
                              ? Icons.visibility_outlined
                              : Icons.visibility_off_outlined,
                        ),
                        onPressed: () {
                          setState(() {
                            _obscureConfirmPassword = !_obscureConfirmPassword;
                          });
                        },
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return AppConstants.requiredField;
                        }
                        if (value != _passwordController.text) {
                          return AppConstants.passwordsDontMatch;
                        }
                        return null;
                      },
                    ),
                    
                    AppSpacing.verticalSpacerXxl,
                    
                    // Register Button
                    AppButton(
                      text: 'Criar conta',
                      onPressed: _handleRegister,
                      backgroundColor: _isOwner 
                          ? AppColors.primary 
                          : AppColors.success,
                    ),
                    
                    AppSpacing.verticalSpacerMd,
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
}
