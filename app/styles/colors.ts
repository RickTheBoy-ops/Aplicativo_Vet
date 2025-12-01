export const colors = {
    // Primary Colors
    primary: '#2180CD',
    primaryLight: '#4A9DE5',
    primaryDark: '#1565B3',

    // Secondary Colors
    secondary: '#5E5240',
    secondaryLight: '#7B6E5D',
    secondaryDark: '#3D3529',

    // Status Colors
    success: '#218C8D',
    successLight: '#3BAAAB',
    successDark: '#176F70',

    error: '#C0152F',
    errorLight: '#D13D52',
    errorDark: '#8F0F23',

    warning: '#A84B2F',
    warningLight: '#C16D4F',
    warningDark: '#7D3723',

    info: '#2180CD',
    infoLight: '#4A9DE5',
    infoDark: '#1565B3',

    // Background Colors
    background: '#FFFBF9',
    surface: '#FFFFF5',
    surfaceLight: '#FFFFFF',
    surfaceDark: '#F5F1EF',

    // Text Colors
    text: '#133452',
    textSecondary: '#62726D',
    textLight: '#8A9A95',
    textDisabled: '#C4CBC8',

    // Border Colors
    border: '#E0E5E3',
    borderLight: '#F0F3F2',
    borderDark: '#B8BFBC',

    // Overlay Colors
    overlay: 'rgba(19, 52, 82, 0.5)',
    overlayLight: 'rgba(19, 52, 82, 0.3)',
    overlayDark: 'rgba(19, 52, 82, 0.7)',

    // White & Black
    white: '#FFFFFF',
    black: '#000000',

    // Transparent
    transparent: 'transparent',

    // ===== NEW: Modern Design Tokens =====

    // Gradients for modern UI
    gradients: {
        // Primary gradient - for CTAs and hero sections
        primary: ['#2180CD', '#1565B3'],
        primaryReverse: ['#1565B3', '#2180CD'],

        // Success gradient - for positive actions
        success: ['#218C8D', '#176F70'],
        successReverse: ['#176F70', '#218C8D'],

        // Hero gradient - for landing/onboarding
        hero: ['#2180CD', '#218C8D'],
        heroReverse: ['#218C8D', '#2180CD'],

        // Sunset gradient - for premium features
        sunset: ['#A84B2F', '#C0152F'],

        // Soft gradients for backgrounds
        softBlue: ['#4A9DE5', '#2180CD', '#1565B3'],
        softGreen: ['#3BAAAB', '#218C8D', '#176F70'],
    },

    // Glassmorphism - transparent backgrounds with blur effect
    glass: {
        // Light glass for dark backgrounds
        light: 'rgba(255, 255, 255, 0.7)',
        lightMedium: 'rgba(255, 255, 255, 0.5)',
        lightSoft: 'rgba(255, 255, 255, 0.3)',

        // Dark glass for light backgrounds
        dark: 'rgba(19, 52, 82, 0.2)',
        darkMedium: 'rgba(19, 52, 82, 0.15)',
        darkSoft: 'rgba(19, 52, 82, 0.08)',

        // Primary colored glass
        primaryLight: 'rgba(33, 128, 205, 0.15)',
        primaryMedium: 'rgba(33, 128, 205, 0.25)',
        primaryStrong: 'rgba(33, 128, 205, 0.4)',

        // Success colored glass
        successLight: 'rgba(33, 140, 141, 0.15)',
        successMedium: 'rgba(33, 140, 141, 0.25)',
        successStrong: 'rgba(33, 140, 141, 0.4)',
    },

    // Enhanced shadow colors (replace old shadows in spacing.ts)
    shadowColors: {
        sm: 'rgba(19, 52, 82, 0.08)',
        md: 'rgba(19, 52, 82, 0.12)',
        lg: 'rgba(19, 52, 82, 0.16)',
        xl: 'rgba(19, 52, 82, 0.20)',
        '2xl': 'rgba(19, 52, 82, 0.24)',
    },

    // Accent colors for variety
    accent: {
        blue: '#2180CD',
        green: '#218C8D',
        orange: '#A84B2F',
        red: '#C0152F',
        purple: '#7B4397',
        pink: '#D83A6E',
        yellow: '#F4A261',
        teal: '#2A9D8F',
    },

    // State colors for interactive elements
    states: {
        hover: 'rgba(33, 128, 205, 0.08)',
        pressed: 'rgba(33, 128, 205, 0.12)',
        focus: 'rgba(33, 128, 205, 0.16)',
        disabled: 'rgba(19, 52, 82, 0.05)',
    },
};

export type ColorKey = keyof typeof colors;
