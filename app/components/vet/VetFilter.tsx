import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VetSearchFilters } from '@types/vet';
import { theme } from '@styles/theme';
import { VET_SPECIALTIES } from '@utils/constants';

interface VetFilterProps {
    filters: VetSearchFilters;
    onFiltersChange: (filters: VetSearchFilters) => void;
}

export function VetFilter({ filters, onFiltersChange }: VetFilterProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSpecialty = (specialtyId: string) => {
        const currentSpecialties = filters.specialties || [];
        const newSpecialties = currentSpecialties.includes(specialtyId)
            ? currentSpecialties.filter((id) => id !== specialtyId)
            : [...currentSpecialties, specialtyId];

        onFiltersChange({ ...filters, specialties: newSpecialties });
    };

    const setDistance = (distance: number) => {
        onFiltersChange({ ...filters, maxDistance: distance });
    };

    const setRating = (rating: number) => {
        onFiltersChange({ ...filters, minRating: rating });
    };

    const clearFilters = () => {
        onFiltersChange({});
    };

    const hasActiveFilters =
        (filters.specialties && filters.specialties.length > 0) ||
        filters.maxDistance !== undefined ||
        filters.minRating !== undefined;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                onPress={() => setIsExpanded(!isExpanded)}
                activeOpacity={0.7}
            >
                <View style={styles.headerLeft}>
                    <Ionicons name="filter" size={20} color={theme.colors.primary} />
                    <Text style={styles.headerTitle}>Filtros</Text>
                    {hasActiveFilters && <View style={styles.badge} />}
                </View>

                <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={theme.colors.textSecondary}
                />
            </TouchableOpacity>

            {isExpanded && (
                <View style={styles.content}>
                    {/* Specialties */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Especialidades</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.scrollView}
                        >
                            {VET_SPECIALTIES.map((specialty) => {
                                const isSelected = filters.specialties?.includes(specialty.id) || false;
                                return (
                                    <TouchableOpacity
                                        key={specialty.id}
                                        style={[
                                            styles.chip,
                                            isSelected && styles.chipSelected,
                                        ]}
                                        onPress={() => toggleSpecialty(specialty.id)}
                                        activeOpacity={0.7}
                                    >
                                        <Text
                                            style={[
                                                styles.chipText,
                                                isSelected && styles.chipTextSelected,
                                            ]}
                                        >
                                            {specialty.label}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>

                    {/* Distance */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Distância Máxima</Text>
                        <View style={styles.distanceOptions}>
                            {[5, 10, 20, 50].map((distance) => {
                                const isSelected = filters.maxDistance === distance;
                                return (
                                    <TouchableOpacity
                                        key={distance}
                                        style={[
                                            styles.distanceChip,
                                            isSelected && styles.chipSelected,
                                        ]}
                                        onPress={() => setDistance(distance)}
                                        activeOpacity={0.7}
                                    >
                                        <Text
                                            style={[
                                                styles.chipText,
                                                isSelected && styles.chipTextSelected,
                                            ]}
                                        >
                                            {distance}km
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* Rating */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Avaliação Mínima</Text>
                        <View style={styles.ratingOptions}>
                            {[3, 4, 4.5].map((rating) => {
                                const isSelected = filters.minRating === rating;
                                return (
                                    <TouchableOpacity
                                        key={rating}
                                        style={[
                                            styles.ratingChip,
                                            isSelected && styles.chipSelected,
                                        ]}
                                        onPress={() => setRating(rating)}
                                        activeOpacity={0.7}
                                    >
                                        <Ionicons
                                            name="star"
                                            size={16}
                                            color={isSelected ? theme.colors.white : theme.colors.warning}
                                        />
                                        <Text
                                            style={[
                                                styles.chipText,
                                                isSelected && styles.chipTextSelected,
                                            ]}
                                        >
                                            {rating}+
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                        <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
                            <Text style={styles.clearButtonText}>Limpar Filtros</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.md,
        ...theme.shadows.sm,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.md,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginLeft: theme.spacing.sm,
    },
    badge: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.primary,
        marginLeft: theme.spacing.sm,
    },
    content: {
        padding: theme.spacing.md,
        paddingTop: 0,
    },
    section: {
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    scrollView: {
        marginHorizontal: -theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
    },
    chip: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.surfaceDark,
        marginRight: theme.spacing.sm,
    },
    chipSelected: {
        backgroundColor: theme.colors.primary,
    },
    chipText: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.text,
    },
    chipTextSelected: {
        color: theme.colors.white,
    },
    distanceOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    distanceChip: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.surfaceDark,
        marginRight: theme.spacing.sm,
        marginBottom: theme.spacing.sm,
    },
    ratingOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    ratingChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.surfaceDark,
        marginRight: theme.spacing.sm,
        marginBottom: theme.spacing.sm,
    },
    clearButton: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.error + '20',
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
    },
    clearButtonText: {
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.colors.error,
    },
});
