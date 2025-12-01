import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from '@components/common/SafeAreaView';
import { Header } from '@components/common/Header';
import { Card } from '@components/common/Card';
import { theme } from '@styles/theme';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface AnalyticsScreenProps {
    navigation: {
        goBack: () => void;
    };
}

export function AnalyticsScreen({ navigation }: AnalyticsScreenProps) {
    // Mock data - in real app, this would come from API
    const analytics = {
        thisMonth: {
            appointments: 45,
            revenue: 2450.00,
            newClients: 12,
            avgRating: 4.8,
        },
        lastMonth: {
            appointments: 38,
            revenue: 2100.00,
            newClients: 9,
            avgRating: 4.7,
        },
        topServices: [
            { name: 'Consulta Geral', count: 18 },
            { name: 'Vacinação', count: 12 },
            { name: 'Cirurgia', count: 8 },
        ],
        monthlyTrend: [
            { month: 'Jan', appointments: 32, revenue: 1800 },
            { month: 'Fev', appointments: 35, revenue: 1950 },
            { month: 'Mar', appointments: 38, revenue: 2100 },
            { month: 'Abr', appointments: 45, revenue: 2450 },
        ],
    };

    const calculateGrowth = (current: number, previous: number) => {
        const growth = ((current - previous) / previous) * 100;
        return {
            value: Math.abs(growth).toFixed(1),
            isPositive: growth >= 0,
        };
    };

    const MetricCard = ({
        icon,
        label,
        value,
        growth,
        color,
    }: {
        icon: keyof typeof Ionicons.glyphMap;
        label: string;
        value: string;
        growth: { value: string; isPositive: boolean };
        color: string;
    }) => (
        <Card style={styles.metricCard}>
            <View style={[styles.metricIcon, { backgroundColor: color + '20' }]}>
                <Ionicons name={icon} size={24} color={color} />
            </View>

            <Text style={styles.metricValue}>{value}</Text>
            <Text style={styles.metricLabel}>{label}</Text>

            <View style={styles.growth}>
                <Ionicons
                    name={growth.isPositive ? 'trending-up' : 'trending-down'}
                    size={16}
                    color={growth.isPositive ? theme.colors.success : theme.colors.error}
                />
                <Text
                    style={[
                        styles.growthText,
                        { color: growth.isPositive ? theme.colors.success : theme.colors.error },
                    ]}
                >
                    {growth.value}%
                </Text>
            </View>
        </Card>
    );

    return (
        <SafeAreaView>
            <Header
                title="Analytics"
                subtitle="Acompanhe seu desempenho"
                showBack
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView style={styles.container}>
                <Text style={styles.sectionTitle}>Métricas do Mês</Text>

                <View style={styles.metricsGrid}>
                    <MetricCard
                        icon="calendar-outline"
                        label="Atendimentos"
                        value={analytics.thisMonth.appointments.toString()}
                        growth={calculateGrowth(
                            analytics.thisMonth.appointments,
                            analytics.lastMonth.appointments,
                        )}
                        color={theme.colors.primary}
                    />

                    <MetricCard
                        icon="cash-outline"
                        label="Receita"
                        value={`R$ ${analytics.thisMonth.revenue.toFixed(0)}`}
                        growth={calculateGrowth(
                            analytics.thisMonth.revenue,
                            analytics.lastMonth.revenue,
                        )}
                        color={theme.colors.success}
                    />
                </View>

                <View style={styles.metricsGrid}>
                    <MetricCard
                        icon="people-outline"
                        label="Novos Clientes"
                        value={analytics.thisMonth.newClients.toString()}
                        growth={calculateGrowth(
                            analytics.thisMonth.newClients,
                            analytics.lastMonth.newClients,
                        )}
                        color={theme.colors.warning}
                    />

                    <MetricCard
                        icon="star-outline"
                        label="Avaliação Média"
                        value={analytics.thisMonth.avgRating.toFixed(1)}
                        growth={calculateGrowth(
                            analytics.thisMonth.avgRating,
                            analytics.lastMonth.avgRating,
                        )}
                        color={theme.colors.secondary}
                    />
                </View>

                <Text style={styles.sectionTitle}>Serviços Mais Solicitados</Text>

                <Card>
                    {analytics.topServices.map((service, index) => (
                        <View key={service.name} style={styles.serviceRow}>
                            <View style={styles.serviceRank}>
                                <Text style={styles.serviceRankText}>{index + 1}º</Text>
                            </View>

                            <View style={styles.serviceInfo}>
                                <Text style={styles.serviceName}>{service.name}</Text>
                                <View style={styles.serviceBar}>
                                    <View
                                        style={[
                                            styles.serviceBarFill,
                                            {
                                                width: `${(service.count / analytics.topServices[0].count) * 100}%`,
                                            },
                                        ]}
                                    />
                                </View>
                            </View>

                            <Text style={styles.serviceCount}>{service.count}</Text>
                        </View>
                    ))}
                </Card>

                <Text style={styles.sectionTitle}>Tendência dos Últimos Meses</Text>

                <Card style={styles.chartCard}>
                    <Text style={styles.chartPlaceholder}>
                        📊 Gráfico de tendências será implementado com biblioteca de charts
                    </Text>

                    {analytics.monthlyTrend.map((month) => (
                        <View key={month.month} style={styles.trendRow}>
                            <Text style={styles.trendMonth}>{month.month}</Text>
                            <Text style={styles.trendValue}>{month.appointments} agendamentos</Text>
                            <Text style={styles.trendValue}>R$ {month.revenue}</Text>
                        </View>
                    ))}
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
    sectionTitle: {
        fontSize: theme.typography.fontSize.h4,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
        marginTop: theme.spacing.lg,
    },
    metricsGrid: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },
    metricCard: {
        flex: 1,
        alignItems: 'center',
        padding: theme.spacing.lg,
    },
    metricIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    metricValue: {
        fontSize: theme.typography.fontSize.h3,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    metricLabel: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: theme.spacing.sm,
    },
    growth: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    growthText: {
        fontSize: theme.typography.fontSize.small,
        fontWeight: theme.typography.fontWeight.medium,
        marginLeft: theme.spacing.xs,
    },
    serviceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    serviceRank: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.primaryLight + '20',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    serviceRankText: {
        fontSize: theme.typography.fontSize.small,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary,
    },
    serviceInfo: {
        flex: 1,
        marginRight: theme.spacing.md,
    },
    serviceName: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    serviceBar: {
        height: 6,
        backgroundColor: theme.colors.surfaceDark,
        borderRadius: 3,
        overflow: 'hidden',
    },
    serviceBarFill: {
        height: '100%',
        backgroundColor: theme.colors.primary,
    },
    serviceCount: {
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
    },
    chartCard: {
        marginBottom: theme.spacing.xl,
    },
    chartPlaceholder: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        padding: theme.spacing.xl,
        fontStyle: 'italic',
    },
    trendRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    trendMonth: {
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.colors.text,
        width: 50,
    },
    trendValue: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
    },
});
