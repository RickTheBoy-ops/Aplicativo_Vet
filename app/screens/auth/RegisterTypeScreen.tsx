import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from '@components/common/SafeAreaView';
import { Card } from '@components/common/Card';
import { theme } from '@styles/theme';

type RegisterTypeScreenNavigationProp = StackNavigationProp<{
    Register: { userType: 'owner' | 'vet' };
    Login: undefined;
}>;

interface RegisterTypeScreenProps {
    navigation: RegisterTypeScreenNavigationProp;
}

export function RegisterTypeScreen({ navigation }: RegisterTypeScreenProps) {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Escolha o tipo de conta</Text>
                    <Text style={styles.subtitle}>
                        Selecione como você deseja usar o VetField
                    </Text>
                </View>

                <View style={styles.options}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register', { userType: 'owner' })}
                        activeOpacity={0.8}
                    >
                        <Card style={styles.optionCard}>
                            <Text style={styles.optionIcon}>🐾</Text>
                            <Text style={styles.optionTitle}>Proprietário</Text>
                            <Text style={styles.optionDescription}>
                                Encontre veterinários para atender seu pet onde você estiver
                            </Text>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register', { userType: 'vet' })}
                        activeOpacity={0.8}
                    >
                        <Card style={styles.optionCard}>
                            <Text style={styles.optionIcon}>⚕️</Text>
                            <Text style={styles.optionTitle}>Veterinário</Text>
                            <Text style={styles.optionDescription}>
                                Ofereça seus serviços veterinários em campo
                            </Text>
                        </Card>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>Voltar para Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.xl,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: theme.spacing['4xl'],
    },
    title: {
        fontSize: theme.typography.fontSize.h2,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    options: {
        gap: theme.spacing.xl,
    },
    optionCard: {
        alignItems: 'center',
        padding: theme.spacing['2xl'],
    },
    optionIcon: {
        fontSize: 60,
        marginBottom: theme.spacing.lg,
    },
    optionTitle: {
        fontSize: theme.typography.fontSize.h3,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    optionDescription: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    backButton: {
        marginTop: theme.spacing['3xl'],
        alignItems: 'center',
        padding: theme.spacing.md,
    },
    backButtonText: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.primary,
    },
});
