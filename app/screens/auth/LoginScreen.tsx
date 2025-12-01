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
import { SafeAreaView } from '@components/common/SafeAreaView';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { LoadingAnimation } from '@components/common/LoadingAnimation';
import { useAuth } from '@hooks/useAuth';
import { theme } from '@styles/theme';
import { validateEmail, validatePassword } from '@utils/validators';

type LoginScreenNavigationProp = StackNavigationProp<{
    RegisterType: undefined;
    ForgotPassword: undefined;
}>;

interface LoginScreenProps {
    navigation: LoginScreenNavigationProp;
}

export function LoginScreen({ navigation }: LoginScreenProps) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        // Reset errors
        setEmailError('');
        setPasswordError('');

        // Validate
        if (!validateEmail(email)) {
            setEmailError('Email inválido');
            return;
        }

        if (!password) {
            setPasswordError('Senha obrigatória');
            return;
        }

        try {
            setIsLoading(true);
            console.log('Iniciando login...');
            await login(email, password);
            console.log('Login bem-sucedido!');
        } catch (error) {
            console.error('Erro no login:', error);
            Alert.alert(
                'Erro no Login',
                error instanceof Error ? error.message : 'Falha ao fazer login',
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Show loading animation while authenticating
    if (isLoading) {
        return <LoadingAnimation message="Entrando no VetField..." />;
    }

    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text style={styles.logo}>🐾 VetField</Text>
                        <Text style={styles.tagline}>Cuidado veterinário onde você estiver</Text>
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="Email"
                            type="email"
                            value={email}
                            onChangeText={setEmail}
                            error={emailError}
                            placeholder="seu@email.com"
                            autoCapitalize="none"
                        />

                        <Input
                            label="Senha"
                            type="password"
                            value={password}
                            onChangeText={setPassword}
                            error={passwordError}
                            placeholder="••••••••"
                        />

                        <Button
                            title="Entrar"
                            onPress={handleLogin}
                            loading={isLoading}
                            fullWidth
                        />

                        <Button
                            title="Esqueci minha senha"
                            variant="ghost"
                            onPress={() => navigation.navigate('ForgotPassword')}
                            fullWidth
                        />
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Não tem uma conta?</Text>
                        <Button
                            title="Criar Conta"
                            variant="outline"
                            onPress={() => navigation.navigate('RegisterType')}
                            fullWidth
                        />
                    </View>
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
        flexGrow: 1,
        justifyContent: 'center',
        padding: theme.spacing.xl,
    },
    header: {
        alignItems: 'center',
        marginBottom: theme.spacing['4xl'],
    },
    logo: {
        fontSize: theme.typography.fontSize.h1 + 10,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary,
        marginBottom: theme.spacing.md,
    },
    tagline: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    form: {
        marginBottom: theme.spacing['3xl'],
    },
    footer: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.md,
    },
});
