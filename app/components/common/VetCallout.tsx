import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Callout } from 'react-native-maps';
import { theme } from '@styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { VetSearchResult } from '../../types/vet';

interface VetCalloutProps {
    vet: VetSearchResult;
    onPress: () => void;
}

export function VetCallout({ vet, onPress }: VetCalloutProps) {
    return (
        <Callout tooltip onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.bubble}>
                    <View style={styles.header}>
                        <Text style={styles.name} numberOfLines={1}>
                            {vet.name}
                        </Text>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.rating}>⭐ {vet.rating.toFixed(1)}</Text>
                        </View>
                    </View>

                    <Text style={styles.specialties} numberOfLines={1}>
                        {vet.specialties?.join(', ') || 'Clínico Geral'}
                    </Text>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Agendar</Text>
                        <Ionicons name="chevron-forward" size={16} color={theme.colors.white} />
                    </TouchableOpacity>
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
            </View>
        </Callout>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        alignItems: 'center',
    },
    bubble: {
        width: '100%',
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.sm,
        ...theme.shadows.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        flex: 1,
        marginRight: 8,
    },
    ratingContainer: {
        backgroundColor: theme.colors.surface,
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    },
    rating: {
        fontSize: theme.typography.fontSize.tiny,
        fontWeight: 'bold',
    },
    specialties: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
        marginBottom: 8,
    },
    button: {
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 6,
        borderRadius: theme.borderRadius.sm,
    },
    buttonText: {
        color: theme.colors.white,
        fontSize: theme.typography.fontSize.small,
        fontWeight: theme.typography.fontWeight.medium,
        marginRight: 4,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: 'rgba(0,0,0,0.1)',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: theme.colors.white,
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
});
