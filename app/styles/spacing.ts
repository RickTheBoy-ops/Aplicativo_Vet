export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40,
    '5xl': 48,
    '6xl': 64,
};

export type SpacingKey = keyof typeof spacing;

// Border Radius
export const borderRadius = {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    full: 9999,
};

export type BorderRadiusKey = keyof typeof borderRadius;

// Shadows - Softer and more professional
export const shadows = {
    none: {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    // Subtle shadow for cards
    sm: {
        shadowColor: '#133452', // theme dark text color
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
    },
    // Default card shadow
    md: {
        shadowColor: '#133452',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 4,
    },
    // Elevated components like modals
    lg: {
        shadowColor: '#133452',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 8,
        elevation: 8,
    },
    // Hero elements and floating buttons
    xl: {
        shadowColor: '#133452',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.20,
        shadowRadius: 12,
        elevation: 12,
    },
    // Maximum elevation for critical elements
    '2xl': {
        shadowColor: '#133452',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.24,
        shadowRadius: 16,
        elevation: 16,
    },
};

export type ShadowKey = keyof typeof shadows;
