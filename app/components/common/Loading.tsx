import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { theme } from '@styles/theme';

interface LoadingProps {
    message?: string;
    size?: 'small' | 'large';
}

export function Loading({ message, size = 'large' }: LoadingProps) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={theme.colors.primary} />
            {message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.background,
    },
    message: {
        marginTop: theme.spacing.lg,
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
});
