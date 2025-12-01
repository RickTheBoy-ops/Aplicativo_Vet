import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { SafeAreaView } from '@components/common/SafeAreaView';
import { Header } from '@components/common/Header';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { useAuth } from '@hooks/useAuth';
import { Vet } from '../../types/user';
import { theme } from '@styles/theme';
import { Ionicons } from '@expo/vector-icons';

interface DashboardScreenProps {
    navigation: {
        navigate: (screen: string, params?: unknown) => void;
    };
}

export function DashboardScreen({ navigation }: DashboardScreenProps) {
    const { user } = useAuth();
    const vet = user as Vet;

    // Mock data - in real app, this would come from API
    const [stats] = useState({
        appointmentsToday: 3,
        appointmentsWeek: 12,
        appointmentsMonth: 45,
        revenueMonth: 2450.00,
        rating: vet?.rating || 4.8,
        totalReviews: vet?.totalReviews || 156,
    });

    const StatCard = ({
        icon,
        label,
        value,
        color,
    }: {
        icon: keyof typeof Ionicons.glyphMap;
        label: string;
        value: string | number;
        color: string;
    }) => (
        <Card style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
                <Ionicons name={icon} size={24} color={color} />
            </View>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </Card>
    );

    return (
        <SafeAreaView>
            <Header
                title="Dashboard"
                subtitle={`Olá, Dr(a). ${vet?.name || 'Veterinário'}`}
            />

            <ScrollView style={styles.container}>
                {/* Subscription Status */}
                <Card style={styles.subscriptionCard}>
                    <View style={styles.subscriptionHeader}>
                        <View>
                            <Text style={styles.subscriptionTitle}>Plano Atual</Text>
                            <Text style={styles.subscriptionPlan}>
                                {vet?.subscription?.plan?.toUpperCase() || 'FREE'}
                            </Text>
                        </View>

                        <Button
                            title="Gerenciar"
                            variant="outline"
                            size="sm"
                            onPress={() => navigation.navigate('Subscription')}
                        />
                    </View>

                    <View style={styles.subscriptionStats}>
                        <View style={styles.subscriptionStat}>
                            <Text style={styles.subscriptionStatValue}>
                                {vet?.subscription?.appointmentsUsed || 0}
                            </Text>
                            <Text style={styles.subscriptionStatLabel}>Usados</Text>
                        </View>

                        <View style={styles.subscriptionStat}>
                            <Text style={styles.subscriptionStatValue}>
                                {vet?.subscription?.appointmentsLimit || 2}
                            </Text>
                            <Text style={styles.subscriptionStatLabel}>Limite</Text>
                        </View>

                        <View style={styles.subscriptionStat}>
                            <Text style={styles.subscriptionStatValue}>
                                {vet?.subscription?.appointmentsLimit -
                                    (vet?.subscription?.appointmentsUsed || 0) ||
                                    2}
                            </Text>
                            <Text style={styles.subscriptionStatLabel}>Restantes</Text>
                        </View>
                    </View>
                </Card>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <StatCard
                        icon="calendar-outline"
                        label="Hoje"
                        value={stats.appointmentsToday}
                        color={theme.colors.primary}
                    />
                    <StatCard
                        icon="calendar"
                        label="Esta Semana"
                        value={stats.appointmentsWeek}
                        color={theme.colors.success}
                    />
                </View>

                <View style={styles.statsGrid}>
                    <StatCard
                        icon="briefcase-outline"
                        label="Este Mês"
                        value={stats.appointmentsMonth}
                        color={theme.colors.warning}
                    />
                    <StatCard
                        icon="cash-outline"
                        label="Receita Mensal"
                        value={`R$ ${stats.revenueMonth.toFixed(0)}`}
                        color={theme.colors.secondary}
                    />
                </View>

                {/* Rating Card */}
                <Card style={styles.ratingCard}>
                    <View style={styles.ratingHeader}>
                        <Ionicons name="star" size={32} color={theme.colors.warning} />
                        <View style={styles.ratingInfo}>
                            <Text style={styles.ratingValue}>{stats.rating.toFixed(1)}</Text>
                            <Text style={styles.ratingLabel}>
                                {stats.totalReviews} avaliações
                            </Text>
                        </View>
                    </View>
                </Card>

                {/* Quick Actions */}
                <Card style={styles.actionsCard}>
                    <Text style={styles.actionsTitle}>Ações Rápidas</Text>

                    <Button
                        title="Ver Agendamentos"
                        variant="outline"
                        onPress={() => navigation.navigate('Appointments')}
                        fullWidth
                        style={styles.actionButton}
                    />

                    <Button
                        title="Gerenciar Disponibilidade"
                        variant="outline"
                        onPress={() => navigation.navigate('Availability')}
                        fullWidth
                        style={styles.actionButton}
                    />

                    <Button
                        title="Ver Analytics"
                        variant="outline"
                        onPress={() => navigation.navigate('Analytics')}
                        fullWidth
                    />
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.md,
    },
    subscriptionCard: {
        marginBottom: theme.spacing.lg,
    },
    subscriptionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.lg,
    },
    subscriptionTitle: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },
    subscriptionPlan: {
        fontSize: theme.typography.fontSize.h3,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.primary,
    },
    subscriptionStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: theme.spacing.lg,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    subscriptionStat: {
        alignItems: 'center',
    },
    subscriptionStatValue: {
        fontSize: theme.typography.fontSize.h2,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    subscriptionStatLabel: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        padding: theme.spacing.lg,
    },
    statIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    statValue: {
        fontSize: theme.typography.fontSize.h2,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    statLabel: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    ratingCard: {
        marginBottom: theme.spacing.lg,
    },
    ratingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingInfo: {
        marginLeft: theme.spacing.lg,
    },
    ratingValue: {
        fontSize: theme.typography.fontSize.h1,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
    },
    ratingLabel: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
    },
    actionsCard: {
        marginBottom: theme.spacing.xl,
    },
    actionsTitle: {
        fontSize: theme.typography.fontSize.h4,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.lg,
    },
    actionButton: {
        marginBottom: theme.spacing.md,
    },
});
