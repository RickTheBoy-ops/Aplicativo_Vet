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
import { Header } from '@components/common/Header';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { authService } from '@services/api/authService';
import { theme } from '@styles/theme';
import { validateEmail } from '@utils/validators';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<{ Login: undefined }>;

interface ForgotPasswordScreenProps {
    navigation: ForgotPasswordScreenNavigationProp;
}

export function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleResetPassword = async () => {
        setEmailError('');

        if (!validateEmail(email)) {
            setEmailError('Email inválido');
            return;
        }

        try {
            setIsLoading(true);

            const response = await authService.forgotPassword(email);

            if (!response.success) {
                throw new Error(response.error?.message || 'Falha ao enviar email');
            }

            setEmailSent(true);
            Alert.alert(
                'Email Enviado',
                'Instruções para redefinir sua senha foram enviadas para seu email.',
            );
        } catch (error) {
            Alert.alert(
                'Erro',
                error instanceof Error ? error.message : 'Falha ao enviar email',
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView>
            <Header
                title="Recuperar Senha"
                showBack
                onBackPress={() => navigation.goBack()}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {!emailSent ? (
                        <>
                            <Text style={styles.instructions}>
                                Digite seu email cadastrado. Enviaremos instruções para redefinir sua senha.
                            </Text>

                            <Input
                                label="Email"
                                type="email"
                                value={email}
                                onChangeText={setEmail}
                                error={emailError}
                                placeholder="seu@email.com"
                            />

                            <Button
                                title="Enviar Email"
                                onPress={handleResetPassword}
                                loading={isLoading}
                                fullWidth
                            />
                        </>
                    ) : (
                        <View style={styles.successContainer}>
                            <Text style={styles.successIcon}>✅</Text>
                            <Text style={styles.successTitle}>Email Enviado!</Text>
                            <Text style={styles.successMessage}>
                                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                            </Text>

                            <Button
                                title="Voltar para Login"
                                onPress={() => navigation.navigate('Login')}
                                fullWidth
                            />
                        </View>
                    )}
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
    instructions: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xl,
        lineHeight: theme.typography.lineHeight.body,
    },
    successContainer: {
        alignItems: 'center',
        paddingTop: theme.spacing['4xl'],
    },
    successIcon: {
        fontSize: 80,
        marginBottom: theme.spacing.xl,
    },
    successTitle: {
        fontSize: theme.typography.fontSize.h2,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    successMessage: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: theme.spacing['3xl'],
        lineHeight: theme.typography.lineHeight.body,
    },
});
