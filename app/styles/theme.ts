import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius, shadows } from './spacing';

export const theme = {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,

    // Component Specific Styles
    button: {
        height: {
            sm: 32,
            md: 44,
            lg: 52,
        },
        paddingHorizontal: {
            sm: spacing.md,
            md: spacing.xl,
            lg: spacing['2xl'],
        },
    },

    input: {
        height: 48,
        borderWidth: 1,
        paddingHorizontal: spacing.lg,
        fontSize: typography.fontSize.body,
    },

    card: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.lg,
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        ...shadows.md,
    },

    header: {
        height: 60,
        paddingHorizontal: spacing.lg,
        backgroundColor: colors.primary,
    },

    // Animation Durations
    animation: {
        fast: 150,
        normal: 300,
        slow: 500,
    },
};

export type Theme = typeof theme;
