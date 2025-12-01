import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { SafeAreaView } from '@components/common/SafeAreaView';
import { Header } from '@components/common/Header';
import { Card } from '@components/common/Card';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { useAuth } from '@hooks/useAuth';
import { authService } from '@services/api/authService';
import { theme } from '@styles/theme';

interface ProfileScreenProps {
    navigation: {
        navigate: (screen: string) => void;
    };
}

export function ProfileScreen({ navigation }: ProfileScreenProps) {
    const { user, logout, updateUser } = useAuth();

    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveProfile = async () => {
        // In real app, this would call an update profile endpoint
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    };

    const handleLogout = () => {
        Alert.alert('Sair', 'Deseja realmente sair da sua conta?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Sair',
                style: 'destructive',
                onPress: async () => {
                    await logout();
                },
            },
        ]);
    };

    return (
        <SafeAreaView>
            <Header title="Meu Perfil" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Card style={styles.section}>
                        <Text style={styles.sectionTitle}>Informações Pessoais</Text>

                        <Input
                            label="Nome Completo"
                            value={name}
                            onChangeText={setName}
                            placeholder="Seu nome"
                        />

                        <Input
                            label="Email"
                            type="email"
                            value={user?.email || ''}
                            editable={false}
                            containerStyle={styles.disabledInput}
                        />

                        <Input
                            label="Telefone"
                            type="phone"
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="(99) 99999-9999"
                        />

                        <Button
                            title="Salvar Alterações"
                            onPress={handleSaveProfile}
                            loading={isLoading}
                            fullWidth
                        />
                    </Card>

                    <Card style={styles.section}>
                        <Text style={styles.sectionTitle}>Meus Animais</Text>
                        <Text style={styles.helperText}>
                            Gerencie as informações dos seus pets
                        </Text>

                        <Button
                            title="Gerenciar Animais"
                            variant="outline"
                            onPress={() => navigation.navigate('AnimalManagement')}
                            fullWidth
                            style={styles.actionButton}
                        />
                    </Card>

                    <Card style={styles.section}>
                        <Text style={styles.sectionTitle}>Conta</Text>

                        <Button
                            title="Alterar Senha"
                            variant="outline"
                            onPress={() => {
                                Alert.alert('Em Desenvolvimento', 'Funcionalidade em breve');
                            }}
                            fullWidth
                            style={styles.actionButton}
                        />

                        <Button
                            title="Sair da Conta"
                            variant="ghost"
                            onPress={handleLogout}
                            fullWidth
                            textStyle={styles.logoutText}
                        />
                    </Card>
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
        padding: theme.spacing.md,
    },
    section: {
        marginBottom: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSize.h4,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    helperText: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.md,
    },
    disabledInput: {
        opacity: 0.6,
    },
    actionButton: {
        marginTop: theme.spacing.sm,
    },
    logoutText: {
        color: theme.colors.error,
    },
});
