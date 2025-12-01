import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withSequence,
} from 'react-native-reanimated';
import { theme } from '@styles/theme';
import { springConfigs } from '@animations/shared';

interface RatingStarsProps {
    rating: number;
    maxRating?: number;
    size?: number;
    color?: string;
    interactive?: boolean;
    onRatingChange?: (rating: number) => void;
    style?: ViewStyle;
    showHalfStars?: boolean;
}

export function RatingStars({
    rating,
    maxRating = 5,
    size = 20,
    color = theme.colors.warning,
    interactive = false,
    onRatingChange,
    style,
    showHalfStars = false,
}: RatingStarsProps) {
    const [tempRating, setTempRating] = useState(rating);

    const handlePress = (index: number) => {
        if (!interactive) return;

        const newRating = index + 1;
        setTempRating(newRating);
        onRatingChange?.(newRating);
    };

    const getStarType = (index: number): 'star' | 'star-half' | 'star-outline' => {
        const displayRating = interactive ? tempRating : rating;
        const diff = displayRating - index;

        if (diff >= 1) return 'star';
        if (showHalfStars && diff >= 0.5 && diff < 1) return 'star-half';
        return 'star-outline';
    };

    return (
        <View style={[styles.container, style]}>
            {Array.from({ length: maxRating }).map((_, index) => (
                <AnimatedStar
                    key={index}
                    type={getStarType(index)}
                    size={size}
                    color={color}
                    interactive={interactive}
                    onPress={() => handlePress(index)}
                />
            ))}
        </View>
    );
}

interface AnimatedStarProps {
    type: 'star' | 'star-half' | 'star-outline';
    size: number;
    color: string;
    interactive: boolean;
    onPress: () => void;
}

function AnimatedStar({ type, size, color, interactive, onPress }: AnimatedStarProps) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePress = () => {
        if (!interactive) return;

        // Bounce animation
        scale.value = withSequence(
            withSpring(1.3, springConfigs.bouncy),
            withSpring(1, springConfigs.gentle)
        );

        onPress();
    };

    const StarContent = (
        <Animated.View style={animatedStyle}>
            <Ionicons
                name={type}
                size={size}
                color={type === 'star-outline' ? theme.colors.border : color}
            />
        </Animated.View>
    );

    if (!interactive) {
        return StarContent;
    }

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            {StarContent}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
    },
});
