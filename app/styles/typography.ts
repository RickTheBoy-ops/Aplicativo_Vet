export const typography = {
    // Font Families
    fontFamily: {
        regular: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        medium: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        semiBold: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        bold: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },

    // Font Sizes
    fontSize: {
        h1: 30,
        h2: 24,
        h3: 20,
        h4: 18,
        body: 14,
        small: 12,
        tiny: 10,
    },

    // Font Weights
    fontWeight: {
        regular: '400' as const,
        medium: '500' as const,
        semiBold: '600' as const,
        bold: '700' as const,
    },

    // Line Heights
    lineHeight: {
        h1: 38,
        h2: 32,
        h3: 28,
        h4: 26,
        body: 20,
        small: 18,
        tiny: 14,
    },

    // Letter Spacing
    letterSpacing: {
        tight: -0.5,
        normal: 0,
        wide: 0.5,
    },
};

export type TypographyKey = keyof typeof typography;
