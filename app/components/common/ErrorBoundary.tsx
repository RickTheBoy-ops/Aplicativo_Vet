import React, { Component, ReactNode, ErrorInfo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@styles/theme';
import { logger } from '@utils/logger';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        logger.error('ErrorBoundary caught error:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
        });
    };

    render() {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Algo deu errado</Text>
                    <Text style={styles.message}>
                        Desculpe, ocorreu um erro inesperado. Por favor, tente novamente.
                    </Text>
                    {__DEV__ && this.state.error && (
                        <Text style={styles.errorDetails}>{this.state.error.toString()}</Text>
                    )}
                    <TouchableOpacity style={styles.button} onPress={this.handleReset}>
                        <Text style={styles.buttonText}>Tentar Novamente</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.background,
    },
    title: {
        fontSize: theme.typography.fontSize.h2,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    message: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
    },
    errorDetails: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.error,
        marginBottom: theme.spacing.xl,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surfaceDark,
        borderRadius: theme.borderRadius.md,
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
    },
    buttonText: {
        color: theme.colors.white,
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.semiBold,
    },
});
