import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { RatingStars } from './RatingStars';
import { theme } from '@styles/theme';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface Review {
    id: string;
    rating: number;
    comment: string;
    userName: string;
    userPhoto?: string;
    createdAt: string;
    helpful?: number;
}

interface ReviewCardProps {
    review: Review;
    style?: ViewStyle;
}

export function ReviewCard({ review, style }: ReviewCardProps) {
    const timeAgo = formatDistanceToNow(new Date(review.createdAt), {
        addSuffix: true,
        locale: ptBR,
    });

    return (
        <View style={[styles.container, style]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    {review.userPhoto ? (
                        <View style={styles.avatar}>
                            {/* TODO: Add Image component */}
                            <Text style={styles.avatarText}>{review.userName[0].toUpperCase()}</Text>
                        </View>
                    ) : (
                        <View style={[styles.avatar, styles.avatarPlaceholder]}>
                            <Text style={styles.avatarText}>{review.userName[0].toUpperCase()}</Text>
                        </View>
                    )}
                    <View style={styles.userDetails}>
                        <Text style={styles.userName}>{review.userName}</Text>
                        <Text style={styles.timeAgo}>{timeAgo}</Text>
                    </View>
                </View>
                <RatingStars rating={review.rating} size={16} />
            </View>

            {/* Comment */}
            {review.comment && (
                <Text style={styles.comment}>{review.comment}</Text>
            )}

            {/* Helpful count */}
            {review.helpful && review.helpful > 0 && (
                <View style={styles.footer}>
                    <Text style={styles.helpful}>
                        {review.helpful} {review.helpful === 1 ? 'pessoa achou' : 'pessoas acharam'} útil
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        ...theme.shadows.sm,
        gap: theme.spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
        flex: 1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        backgroundColor: theme.colors.glass.primaryMedium,
    },
    avatarText: {
        color: theme.colors.white,
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.bold,
    },
    userDetails: {
        flex: 1,
        gap: theme.spacing.xs / 2,
    },
    userName: {
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
    },
    timeAgo: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
    },
    comment: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.text,
        lineHeight: theme.typography.lineHeight.body,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: theme.colors.borderLight,
        paddingTop: theme.spacing.md,
    },
    helpful: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
    },
});
