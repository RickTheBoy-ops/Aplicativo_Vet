import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TextInputProps,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@styles/theme';

type InputType = 'text' | 'email' | 'password' | 'phone' | 'number';

interface InputProps extends Omit<TextInputProps, 'secureTextEntry'> {
    label?: string;
    error?: string;
    type?: InputType;
    containerStyle?: ViewStyle;
}

export function Input({
    label,
    error,
    type = 'text',
    containerStyle,
    ...rest
}: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const getKeyboardType = (): TextInputProps['keyboardType'] => {
        switch (type) {
            case 'email':
                return 'email-address';
            case 'phone':
                return 'phone-pad';
            case 'number':
                return 'numeric';
            default:
                return 'default';
        }
    };

    const getAutoCapitalize = (): TextInputProps['autoCapitalize'] => {
        if (type === 'email') return 'none';
        return 'sentences';
    };

    const isPassword = type === 'password';

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        error && styles.inputError,
                        isPassword && styles.inputWithIcon,
                    ]}
                    placeholderTextColor={theme.colors.textLight}
                    keyboardType={getKeyboardType()}
                    autoCapitalize={getAutoCapitalize()}
                    secureTextEntry={isPassword && !isPasswordVisible}
                    {...rest}
                />

                {isPassword && (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        <Ionicons
                            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                            size={24}
                            color={theme.colors.textSecondary}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.lg,
    },
    label: {
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    inputContainer: {
        position: 'relative',
    },
    input: {
        height: theme.input.height,
        borderWidth: theme.input.borderWidth,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.input.paddingHorizontal,
        fontSize: theme.input.fontSize,
        color: theme.colors.text,
        backgroundColor: theme.colors.surface,
    },
    inputWithIcon: {
        paddingRight: 48,
    },
    inputError: {
        borderColor: theme.colors.error,
    },
    iconButton: {
        position: 'absolute',
        right: theme.spacing.md,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    error: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.error,
        marginTop: theme.spacing.xs,
    },
});
