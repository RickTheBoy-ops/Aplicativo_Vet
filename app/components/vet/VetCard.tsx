import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@components/common/Card';
import { VetSearchResult } from '@types/vet';
import { theme } from '@styles/theme';
import { formatDistance } from '@utils/formatters';

interface VetCardProps {
    vet: VetSearchResult;
    onPress: () => void;
}

export function VetCard({ vet, onPress }: VetCardProps) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <Card style={styles.card}>
                <View style={styles.header}>
                    <Image
                        source={
                            vet.photoUrl
                                ? { uri: vet.photoUrl }
                                : { uri: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(vet.name) + '&background=random' }
                        }
                        style={styles.avatar}
                    />

                    <View style={styles.headerInfo}>
                        <Text style={styles.name}>{vet.name}</Text>
                        <Text style={styles.crmv}>CRMV: {vet.crmv}</Text>

                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={16} color={theme.colors.warning} />
                            <Text style={styles.rating}>{vet.rating.toFixed(1)}</Text>
                            <Text style={styles.reviews}>({vet.totalReviews} avaliações)</Text>
                        </View>
                    </View>

                    <View style={styles.distanceContainer}>
                        <Ionicons name="location-outline" size={16} color={theme.colors.textSecondary} />
                        <Text style={styles.distance}>{formatDistance(vet.distance)}</Text>
                    </View>
                </View>

                <View style={styles.specialties}>
                    {vet.specialties.slice(0, 3).map((specialty) => (
                        <View key={specialty.id} style={styles.specialtyTag}>
                            <Text style={styles.specialtyText}>{specialty.name}</Text>
                        </View>
                    ))}
                    {vet.specialties.length > 3 && (
                        <Text style={styles.moreSpecialties}>+{vet.specialties.length - 3}</Text>
                    )}
                </View>

                {vet.nextAvailableSlot && (
                    <View style={styles.availability}>
                        <Ionicons name="time-outline" size={16} color={theme.colors.success} />
                        <Text style={styles.availabilityText}>
                            Próximo horário: {vet.nextAvailableSlot.date} às {vet.nextAvailableSlot.startTime}
                        </Text>
                    </View>
                )}
            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: theme.spacing.md,
    },
    header: {
        flexDirection: 'row',
        marginBottom: theme.spacing.md,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.surfaceDark,
    },
    headerInfo: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },
    name: {
        fontSize: theme.typography.fontSize.h4,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    crmv: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginLeft: theme.spacing.xs,
    },
    reviews: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
        marginLeft: theme.spacing.xs,
    },
    distanceContainer: {
        alignItems: 'center',
    },
    distance: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    specialties: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: theme.spacing.md,
    },
    specialtyTag: {
        backgroundColor: theme.colors.primaryLight,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
        marginRight: theme.spacing.sm,
        marginBottom: theme.spacing.sm,
    },
    specialtyText: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.white,
    },
    moreSpecialties: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
        alignSelf: 'center',
    },
    availability: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.successLight + '20',
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
    },
    availabilityText: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.success,
        marginLeft: theme.spacing.sm,
    },
});
