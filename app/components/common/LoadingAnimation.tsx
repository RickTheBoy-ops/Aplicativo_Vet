import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
// import LottieView from 'lottie-react-native';
import { theme } from '@styles/theme';

interface LoadingAnimationProps {
    message?: string;
    size?: number;
}

/**
 * Loading animation component using Lottie
 * TODO: Add actual Lottie animation file to assets/animations/loading-dog.json
 * For now, uses ActivityIndicator as fallback
 */
export function LoadingAnimation({
    message = 'Carregando...',
    size = 200
}: LoadingAnimationProps) {
    return (
        <View style={styles.container}>
            {/* TODO: Replace with LottieView when animation file is added */}
            {/* <LottieView
                source={require('../../../assets/animations/loading-dog.json')}
                autoPlay
                loop
                style={[styles.animation, { width: size, height: size }]}
            /> */}

            {/* Fallback while Lottie file is not available */}
            <View style={[styles.animation, { width: size, height: size }]}>
                <ActivityIndicator
                    size="large"
                    color={theme.colors.primary}
                />
            </View>

            {message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    animation: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        marginTop: theme.spacing.lg,
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        fontWeight: theme.typography.fontWeight.medium,
    },
});
