import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from '@components/common/SafeAreaView';
import { Header } from '@components/common/Header';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { authService } from '@services/api/authService';
import { storageService } from '@services/storage/storageService';
import { theme } from '@styles/theme';
import {
    validateEmail,
    validatePassword,
    validatePhone,
} from '@utils/validators';
import { formatPhone } from '@utils/formatters';
import { useAuth } from '@hooks/useAuth';

type RegisterScreenNavigationProp = StackNavigationProp<{ Login: undefined }>;
type RegisterScreenRouteProp = RouteProp<{ Register: { userType: 'owner' | 'vet' } }, 'Register'>;

interface RegisterScreenProps {
    navigation: RegisterScreenNavigationProp;
    route: RegisterScreenRouteProp;
}

export function RegisterScreen({ navigation, route }: RegisterScreenProps) {
    const { userType } = route.params;
    const { updateUser, register } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    // Password strength check
    const checkPasswordStrength = (pass: string) => {
        let strength = 0;
        if (pass.length >= 8) strength += 1;
        if (/[A-Z]/.test(pass)) strength += 1;
        if (/[a-z]/.test(pass)) strength += 1;
        if (/[0-9]/.test(pass)) strength += 1;
        if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
        return strength; // 0 to 5
    };

    const passwordStrength = checkPasswordStrength(password);
    const getStrengthColor = () => {
        if (passwordStrength <= 2) return 'red';
        if (passwordStrength <= 4) return 'orange';
        return 'green';
    };
    const getStrengthLabel = () => {
        if (!password) return '';
        if (passwordStrength <= 2) return 'Fraca';
        if (passwordStrength <= 4) return 'Média';
        return 'Forte';
    };

    const handleRegister = async () => {
        // Reset errors
        setNameError('');
        setEmailError('');
        setPhoneError('');
        setPasswordError('');
        setConfirmPasswordError('');

        let isValid = true;

        // Validate Name
        if (!name.trim()) {
            setNameError('Nome é obrigatório');
            isValid = false;
        }

        // Validate Email
        if (!validateEmail(email)) {
            setEmailError('Email inválido');
            isValid = false;
        }

        // Validate Phone
        const phoneClean = phone.replace(/\D/g, '');
        if (!validatePhone(phone) && !validatePhone(phoneClean)) {
            setPhoneError('Telefone inválido. Use o formato (99) 99999-9999');
            isValid = false;
        }

        // Validate Password
        if (!validatePassword(password)) {
            setPasswordError('A senha deve ter pelo menos 6 caracteres');
            isValid = false;
        }

        // Validate Confirm Password
        if (password !== confirmPassword) {
            setConfirmPasswordError('As senhas não conferem');
            isValid = false;
        }

        if (!isValid) return;

        try {
            setIsLoading(true);
            console.log('[RegisterScreen] Iniciando registro para:', email);
            
            // Prepare payload based on user type
            // For simplicity in this example, we're assuming generic user or owner
            // In a real app, you might have different endpoints or fields
            await register({
                name,
                email,
                password,
                phone: phoneClean, // Send raw numbers
                role: userType === 'owner' ? 'owner' : 'user'
            });
            
            console.log('[RegisterScreen] Registro concluído com sucesso!');
            // Navigation is usually handled by the AuthContext state change
            // or we can show a success message
            Alert.alert('Sucesso', 'Conta criada com sucesso!');
            
        } catch (error) {
            console.error('[RegisterScreen] Erro no registro:', error);
            Alert.alert(
                'Erro no Cadastro',
                error instanceof Error ? error.message : 'Falha ao criar conta. Verifique sua conexão.',
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhoneChange = (text: string) => {
        // Remove any previous non-numeric character to ensure clean state for re-formatting
        // But if the user is deleting, we need to be careful not to re-add mask immediately
        // The simplest way is to just format the new raw text
        const formatted = formatPhone(text);
        setPhone(formatted);
        
        // Clear error if length is valid (10 or 11 digits)
        const digits = formatted.replace(/\D/g, '');
        if (phoneError && digits.length >= 10) {
             setPhoneError('');
        }
    };

    return (
        <SafeAreaView>
            <Header
                title={userType === 'owner' ? 'Criar Conta - Proprietário' : 'Criar Conta - Veterinário'}
                showBack
                onBackPress={() => navigation.goBack()}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Input
                        label="Nome Completo"
                        value={name}
                        onChangeText={setName}
                        error={nameError}
                        placeholder="Seu nome"
                    />

                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChangeText={setEmail}
                        error={emailError}
                        placeholder="seu@email.com"
                    />

                    <Input
                        label="Telefone"
                        placeholder="(99) 99999-9999"
                        value={phone}
                        onChangeText={handlePhoneChange}
                        error={phoneError}
                        keyboardType="phone-pad"
                        maxLength={15}
                    />

                    <Input
                        label="Senha"
                        placeholder="Mínimo 8 caracteres"
                        value={password}
                        onChangeText={setPassword}
                        error={passwordError}
                        secureTextEntry
                    />
                    {password.length > 0 && (
                        <Text style={{ 
                            color: getStrengthColor(), 
                            marginBottom: 10, 
                            marginLeft: 4,
                            fontSize: 12 
                        }}>
                            Força da senha: {getStrengthLabel()}
                        </Text>
                    )}

                    <Input
                        label="Confirmar Senha"
                        type="password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        error={confirmPasswordError}
                        placeholder="••••••••"
                    />

                    <Button
                        title="Criar Conta"
                        onPress={handleRegister}
                        loading={isLoading}
                        fullWidth
                    />

                    <Button
                        title="Já tenho uma conta"
                        variant="ghost"
                        onPress={() => navigation.navigate('Login')}
                        fullWidth
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: theme.spacing.xl,
    },
});
