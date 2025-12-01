import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@styles/theme';

interface VetMarkerProps {
    imageUrl?: string;
    rating?: number;
}

export function VetMarker({ imageUrl, rating }: VetMarkerProps) {
    return (
        <View style={styles.container}>
            <View style={styles.bubble}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                ) : (
                    <View style={styles.placeholder}>
                        <Ionicons name="medical" size={20} color={theme.colors.white} />
                    </View>
                )}
                {rating && (
                    <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>⭐ {rating.toFixed(1)}</Text>
                    </View>
                )}
            </View>
            <View style={styles.arrowBorder} />
            <View style={styles.arrow} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bubble: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: theme.colors.white,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: theme.colors.primary,
        ...theme.shadows.sm,
    },
    image: {
        width: 42,
        height: 42,
        borderRadius: 21,
    },
    placeholder: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ratingBadge: {
        position: 'absolute',
        bottom: -5,
        backgroundColor: theme.colors.white,
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        ...theme.shadows.sm,
    },
    ratingText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: theme.colors.primary,
        borderWidth: 8,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: theme.colors.white,
        borderWidth: 6,
        alignSelf: 'center',
        marginTop: -18, // Adjust to overlap correctly
    },
});
