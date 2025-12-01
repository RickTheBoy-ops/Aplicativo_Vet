import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle, TextStyle,
} from 'react-native';
import { theme } from '@styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
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
}: ButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            style={[
                styles.base,
                styles[variant],
                styles[size],
                fullWidth && styles.fullWidth,
                isDisabled && styles.disabled,
                style,
            ]}
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary : theme.colors.white}
                />
            ) : (
                <Text style={[styles.text, styles[`${variant}Text`], styles[`${size}Text`], textStyle]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.lg,
    },
    primary: {
        backgroundColor: theme.colors.primary,
    },
    secondary: {
        backgroundColor: theme.colors.secondary,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
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
