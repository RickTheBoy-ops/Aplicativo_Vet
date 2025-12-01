import React, { ReactNode } from 'react';
import { SafeAreaView as RNSafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '@styles/theme';

interface SafeAreaViewProps {
    children: ReactNode;
    style?: ViewStyle;
}

export function SafeAreaView({ children, style }: SafeAreaViewProps) {
    return (
        <RNSafeAreaView style={[styles.container, style]}>
            {children}
        </RNSafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
});
