import React, { ReactNode } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@styles/theme';

interface HeaderProps {
    title: string;
    subtitle?: string;
    showBack?: boolean;
    onBackPress?: () => void;
    rightComponent?: ReactNode;
    style?: ViewStyle;
}

export function Header({
    title,
    subtitle,
    showBack = false,
    onBackPress,
    rightComponent,
    style,
}: HeaderProps) {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.leftContainer}>
                {showBack && onBackPress && (
                    <TouchableOpacity
                        onPress={onBackPress}
                        style={styles.backButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
                    </TouchableOpacity>
                )}

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>
            </View>

            {rightComponent && <View style={styles.rightContainer}>{rightComponent}</View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...theme.header,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    backButton: {
        marginRight: theme.spacing.md,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: theme.typography.fontSize.h3,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.white,
    },
    subtitle: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.white,
        opacity: 0.8,
        marginTop: theme.spacing.xs,
    },
    rightContainer: {
        marginLeft: theme.spacing.md,
    },
});
