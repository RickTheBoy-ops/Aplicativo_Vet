import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@components/common/Card';
import { Review } from '@types/user';
import { theme } from '@styles/theme';
import { formatRelativeTime } from '@utils/formatters';

interface RatingCardProps {
    review: Review;
}

export function RatingCard({ review }: RatingCardProps) {
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Ionicons
                    key={i}
                    name={i <= review.rating ? 'star' : 'star-outline'}
                    size={16}
                    color={theme.colors.warning}
                    style={styles.star}
                />,
            );
        }
        return stars;
    };

    return (
        <Card style={styles.card}>
            <View style={styles.header}>
                <View style={styles.rating}>{renderStars()}</View>
                <Text style={styles.date}>{formatRelativeTime(review.createdAt)}</Text>
            </View>

            {review.comment && <Text style={styles.comment}>{review.comment}</Text>}
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: theme.spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    rating: {
        flexDirection: 'row',
    },
    star: {
        marginRight: theme.spacing.xs,
    },
    date: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
    },
    comment: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.text,
        lineHeight: theme.typography.lineHeight.body,
    },
});
