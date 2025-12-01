import React from 'react';
import { Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    interpolateColor,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { theme } from '@styles/theme';
import { springConfigs } from '@animations/shared';
import { LinearGradient } from 'expo-linear-gradient';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: React.ReactNode;
}

export function Button({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    style,
    textStyle,
    icon,
}: ButtonProps) {
    const isDisabled = disabled || loading;
    const scale = useSharedValue(1);
    const pressed = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const animatedBackgroundStyle = useAnimatedStyle(() => {
        if (variant === 'outline' || variant === 'ghost') return {};

        const backgroundColor = interpolateColor(
            pressed.value,
            [0, 1],
            [
                variant === 'secondary' ? theme.colors.secondary : theme.colors.primary,
                variant === 'secondary' ? theme.colors.secondaryDark : theme.colors.primaryDark,
            ]
        );

        return { backgroundColor };
    });

    const handlePressIn = () => {
        scale.value = withSpring(0.95, springConfigs.gentle);
        pressed.value = withSpring(1, springConfigs.fast);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, springConfigs.gentle);
        pressed.value = withSpring(0, springConfigs.fast);
    };

    const content = (
        <>
            {loading ? (
                <ActivityIndicator
                    color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary : theme.colors.white}
                />
            ) : (
                <>
                    {icon && <>{icon}</>}
                    <Text style={[styles.text, styles[`${variant}Text`], styles[`${size}Text`], textStyle]}>
                        {title}
                    </Text>
                </>
            )}
        </>
    );

    if (variant === 'gradient') {
        return (
            <Pressable
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={isDisabled}
            >
                <Animated.View
                    style={[
                        styles.base,
                        styles[size],
                        fullWidth && styles.fullWidth,
                        isDisabled && styles.disabled,
                        animatedStyle,
                        style,
                    ]}
                >
                    <LinearGradient
                        colors={theme.colors.gradients.primary}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[styles.gradient, styles[size]]}
                    >
                        {content}
                    </LinearGradient>
                </Animated.View>
            </Pressable>
        );
    }

    return (
        <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={isDisabled}
        >
            <Animated.View
                style={[
                    styles.base,
                    styles[variant],
                    styles[size],
                    fullWidth && styles.fullWidth,
                    isDisabled && styles.disabled,
                    animatedStyle,
                    animatedBackgroundStyle,
                    style,
                ]}
            >
                {content}
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.lg,
        gap: theme.spacing.sm,
        ...theme.shadows.sm,
    },
    gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.borderRadius.md,
        gap: theme.spacing.sm,
        width: '100%',
    },
    primary: {
        backgroundColor: theme.colors.primary,
    },
    secondary: {
        backgroundColor: theme.colors.secondary,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    ghost: {
        backgroundColor: 'transparent',
    },
    sm: {
        height: theme.button.height.sm,
        paddingHorizontal: theme.button.paddingHorizontal.sm,
    },
    md: {
        height: theme.button.height.md,
        paddingHorizontal: theme.button.paddingHorizontal.md,
    },
    lg: {
        height: theme.button.height.lg,
        paddingHorizontal: theme.button.paddingHorizontal.lg,
    },
    fullWidth: {
        width: '100%',
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        fontWeight: theme.typography.fontWeight.semiBold,
    },
    primaryText: {
        color: theme.colors.white,
        fontSize: theme.typography.fontSize.body,
    },
    secondaryText: {
        color: theme.colors.white,
        fontSize: theme.typography.fontSize.body,
    },
    outlineText: {
        color: theme.colors.primary,
        fontSize: theme.typography.fontSize.body,
    },
    ghostText: {
        color: theme.colors.primary,
        fontSize: theme.typography.fontSize.body,
    },
    gradientText: {
        color: theme.colors.white,
        fontSize: theme.typography.fontSize.body,
    },
    smText: {
        fontSize: theme.typography.fontSize.small,
    },
    mdText: {
        fontSize: theme.typography.fontSize.body,
    },
    lgText: {
        fontSize: theme.typography.fontSize.h4,
    },
});
