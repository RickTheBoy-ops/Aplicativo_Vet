import { withSpring, withTiming, Easing } from 'react-native-reanimated';

/**
 * Shared animation configurations for consistent motion throughout the app
 */

// Spring configurations
export const springConfigs = {
    // Gentle bounce for buttons
    gentle: {
        damping: 15,
        stiffness: 150,
        mass: 1,
    },
    // Bouncy for playful interactions
    bouncy: {
        damping: 10,
        stiffness: 100,
        mass: 0.8,
    },
    // Stiff for quick responses
    stiff: {
        damping: 20,
        stiffness: 300,
        mass: 1,
    },
    // Smooth for cards and panels
    smooth: {
        damping: 50,
        stiffness: 200,
        mass: 1,
    },
};

// Timing configurations
export const timingConfigs = {
    fast: {
        duration: 150,
        easing: Easing.inOut(Easing.ease),
    },
    normal: {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
    },
    slow: {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
    },
    linear: {
        duration: 200,
        easing: Easing.linear,
    },
};

/**
 * Predefined animations ready to use in components
 */
export const animations = {
    // Button press animation
    buttonPress: () => withSpring(0.95, springConfigs.gentle),
    buttonRelease: () => withSpring(1, springConfigs.gentle),

    // Card hover/press
    cardPress: () => withSpring(0.98, springConfigs.gentle),
    cardRelease: () => withSpring(1, springConfigs.gentle),
    cardHover: () => withTiming(1.02, timingConfigs.fast),

    // Fade animations
    fadeIn: () => withTiming(1, timingConfigs.normal),
    fadeOut: () => withTiming(0, timingConfigs.normal),
    fadeInFast: () => withTiming(1, timingConfigs.fast),
    fadeOutFast: () => withTiming(0, timingConfigs.fast),

    // Scale animations
    scaleIn: () => withSpring(1, springConfigs.bouncy),
    scaleOut: () => withSpring(0, springConfigs.gentle),

    // Slide animations (translate values)
    slideInUp: (distance: number = 20) =>
        withTiming(-distance, timingConfigs.normal),
    slideInDown: (distance: number = 20) =>
        withTiming(distance, timingConfigs.normal),
    slideReset: () => withTiming(0, timingConfigs.normal),

    // Rotation
    rotate: (degrees: number) =>
        withTiming(degrees, timingConfigs.normal),
    rotateReset: () => withTiming(0, timingConfigs.normal),
};

/**
 * Layout animation presets
 */
export const layoutAnimations = {
    // For entering/exiting lists
    listItem: {
        entering: {
            opacity: withTiming(1, timingConfigs.normal),
            transform: [
                { translateY: withSpring(0, springConfigs.smooth) },
            ],
        },
        exiting: {
            opacity: withTiming(0, timingConfigs.fast),
            transform: [
                { translateY: withTiming(-20, timingConfigs.fast) },
            ],
        },
    },
    // For modals
    modal: {
        entering: {
            opacity: withTiming(1, timingConfigs.normal),
            transform: [
                { scale: withSpring(1, springConfigs.bouncy) },
            ],
        },
        exiting: {
            opacity: withTiming(0, timingConfigs.fast),
            transform: [
                { scale: withTiming(0.9, timingConfigs.fast) },
            ],
        },
    },
};

/**
 * Gesture animation values
 */
export const gestureValues = {
    // Tap
    tapScale: 0.95,
    tapDuration: 100,

    // Swipe thresholds
    swipeThreshold: 50,
    swipeVelocityThreshold: 500,

    // Pan
    panBoundary: 100,
};

export type SpringConfigKey = keyof typeof springConfigs;
export type TimingConfigKey = keyof typeof timingConfigs;
