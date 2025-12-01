import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@components/common/Card';
import { SubscriptionPlanDetails } from '../../types/subscription';
import { theme } from '@styles/theme';
import { formatCurrency } from '@utils/formatters';

interface PlanCardProps {
    plan: SubscriptionPlanDetails;
    isActive?: boolean;
    onSelect: () => void;
}

export function PlanCard({ plan, isActive = false, onSelect }: PlanCardProps) {
    return (
        <TouchableOpacity onPress={onSelect} activeOpacity={0.8}>
            <Card style={[styles.card, isActive && styles.activeCard]}>
                {plan.isPopular && (
                    <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>MAIS POPULAR</Text>
                    </View>
                )}

                <Text style={styles.planName}>{plan.name}</Text>

                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{formatCurrency(plan.monthlyPrice)}</Text>
                    <Text style={styles.period}>/mês</Text>
                </View>

                {plan.yearlyPrice > 0 && (
                    <Text style={styles.yearlyPrice}>
                        ou {formatCurrency(plan.yearlyPrice)}/ano
                    </Text>
                )}

                <Text style={styles.appointmentsLimit}>
                    {plan.appointmentsPerMonth === -1
                        ? 'Agendamentos ilimitados'
                        : `Até ${plan.appointmentsPerMonth} agendamentos/mês`}
                </Text>

                <View style={styles.features}>
                    {plan.features.map((feature) => (
                        <View key={feature.id} style={styles.featureRow}>
                            <Ionicons
                                name={feature.included ? 'checkmark-circle' : 'close-circle'}
                                size={20}
                                color={feature.included ? theme.colors.success : theme.colors.textLight}
                            />
                            <Text
                                style={[
                                    styles.featureText,
                                    !feature.included && styles.featureTextDisabled,
                                ]}
                            >
                                {feature.description}
                            </Text>
                        </View>
                    ))}
                </View>

                {isActive && (
                    <View style={styles.activeBadge}>
                        <Text style={styles.activeText}>Plano Atual</Text>
                    </View>
                )}
            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: theme.spacing.lg,
        position: 'relative',
    },
    activeCard: {
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    popularBadge: {
        position: 'absolute',
        top: -10,
        right: theme.spacing.lg,
        backgroundColor: theme.colors.warning,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
    },
    popularText: {
        fontSize: theme.typography.fontSize.tiny,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.white,
    },
    planName: {
        fontSize: theme.typography.fontSize.h2,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: theme.spacing.xs,
    },
    price: {
        fontSize: theme.typography.fontSize.h1,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary,
    },
    period: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        marginLeft: theme.spacing.xs,
    },
    yearlyPrice: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.lg,
    },
    appointmentsLimit: {
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.colors.text,
        marginBottom: theme.spacing.lg,
    },
    features: {
        gap: theme.spacing.md,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    featureText: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.text,
        marginLeft: theme.spacing.sm,
        flex: 1,
    },
    featureTextDisabled: {
        color: theme.colors.textLight,
    },
    activeBadge: {
        marginTop: theme.spacing.lg,
        backgroundColor: theme.colors.success + '20',
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
    },
    activeText: {
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.success,
    },
});
