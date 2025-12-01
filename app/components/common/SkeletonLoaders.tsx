import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Skeleton } from './Skeleton';
import { theme } from '@styles/theme';

interface SkeletonCardProps {
    style?: ViewStyle;
}

export function SkeletonCard({ style }: SkeletonCardProps) {
    return (
        <View style={[styles.container, style]}>
            {/* Header */}
            <View style={styles.header}>
                <Skeleton width={60} height={60} borderRadius={theme.borderRadius.full} />
                <View style={styles.headerInfo}>
                    <Skeleton width="70%" height={20} />
                    <Skeleton width="50%" height={16} style={{ marginTop: theme.spacing.xs }} />
                </View>
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Skeleton width="100%" height={16} />
                <Skeleton width="90%" height={16} style={{ marginTop: theme.spacing.sm }} />
                <Skeleton width="80%" height={16} style={{ marginTop: theme.spacing.sm }} />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Skeleton width={80} height={32} borderRadius={theme.borderRadius.md} />
                <Skeleton width={100} height={32} borderRadius={theme.borderRadius.md} />
            </View>
        </View>
    );
}

interface SkeletonListProps {
    count?: number;
    style?: ViewStyle;
}

export function SkeletonList({ count = 3, style }: SkeletonListProps) {
    return (
        <View style={[styles.list, style]}>
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </View>
    );
}

interface SkeletonVetCardProps {
    style?: ViewStyle;
}

export function SkeletonVetCard({ style }: SkeletonVetCardProps) {
    return (
        <View style={[styles.vetCard, style]}>
            {/* Vet photo */}
            <Skeleton width={80} height={80} borderRadius={theme.borderRadius.lg} />

            <View style={styles.vetInfo}>
                {/* Name */}
                <Skeleton width="60%" height={18} />

                {/* CRMV */}
                <Skeleton width="40%" height={14} style={{ marginTop: theme.spacing.xs }} />

                {/* Rating */}
                <View style={styles.ratingRow}>
                    <Skeleton width={100} height={16} />
                    <Skeleton width={60} height={14} />
                </View>

                {/* Specialties */}
                <View style={styles.specialtiesRow}>
                    <Skeleton width={70} height={24} borderRadius={theme.borderRadius.full} />
                    <Skeleton width={80} height={24} borderRadius={theme.borderRadius.full} />
                </View>

                {/* Location */}
                <Skeleton width="50%" height={14} style={{ marginTop: theme.spacing.sm }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        ...theme.shadows.sm,
        marginBottom: theme.spacing.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.lg,
    },
    headerInfo: {
        flex: 1,
    },
    content: {
        marginBottom: theme.spacing.lg,
    },
    footer: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    list: {
        gap: theme.spacing.md,
    },
    vetCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        ...theme.shadows.sm,
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    vetInfo: {
        flex: 1,
        gap: theme.spacing.xs,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        marginTop: theme.spacing.sm,
    },
    specialtiesRow: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
        marginTop: theme.spacing.sm,
    },
});
