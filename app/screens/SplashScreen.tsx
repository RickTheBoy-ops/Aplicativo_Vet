import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
// import LottieView from 'lottie-react-native';
import { theme } from '@styles/theme';

interface SplashScreenProps {
    onFinish: () => void;
}

/**
 * Splash screen with Lottie animation
 * TODO: Add actual Lottie animation file to assets/animations/splash-pet-lovers.json
 */
export function SplashScreen({ onFinish }: SplashScreenProps) {
    // const animationRef = useRef<LottieView>(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        // Entry animation
        Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 20,
            friction: 7,
            useNativeDriver: true,
        }).start();

        // Timer to finish splash
        const timer = setTimeout(() => {
            // Fade out animation
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                onFinish();
            });
        }, 3000); // 3 seconds total

        return () => clearTimeout(timer);
    }, []);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }]
                }
            ]}
        >
            {/* TODO: Replace with LottieView when animation file is added */}
            {/* <LottieView
                ref={animationRef}
                source={require('../../../assets/animations/splash-pet-lovers.json')}
                autoPlay
                loop={false}
                style={styles.animation}
                speed={1}
            /> */}

            {/* Temporary fallback */}
            <View style={styles.logoContainer}>
                <Text style={styles.appName}>🐾 VetField</Text>
                <Text style={styles.tagline}>Cuidando do seu rebanho</Text>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: '100%',
        maxWidth: 400,
        height: 400,
    },
    logoContainer: {
        alignItems: 'center',
    },
    appName: {
        fontSize: 48,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary,
        marginBottom: theme.spacing.md,
    },
    tagline: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        fontWeight: theme.typography.fontWeight.medium,
    },
});
