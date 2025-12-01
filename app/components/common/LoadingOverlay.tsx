import { Modal, View, StyleSheet } from 'react-native';
// import LottieView from 'lottie-react-native';
import { theme } from '@styles/theme';
import { LoadingAnimation } from './LoadingAnimation';

interface LoadingOverlayProps {
    visible: boolean;
    message?: string;
    transparent?: boolean;
}

/**
 * Loading overlay that can be used as a modal
 * Shows Lottie animation over current screen
 */
export function LoadingOverlay({
    visible,
    message = 'Carregando...',
    transparent = true
}: LoadingOverlayProps) {
    return (
        <Modal
            transparent={transparent}
            visible={visible}
            animationType="fade"
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <View style={styles.content}>
                    {/* TODO: Add Lottie animation */}
                    <LoadingAnimation message={message} size={150} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: theme.colors.overlay,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.xl,
        alignItems: 'center',
        minWidth: 200,
        ...theme.shadows.xl,
    },
});
