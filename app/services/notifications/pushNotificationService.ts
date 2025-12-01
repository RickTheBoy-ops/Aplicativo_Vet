import * as Notifications from 'expo-notifications';
import { Notification } from '@types/common';

// Configure notification handler
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

class PushNotificationService {
    /**
     * Request notification permissions
     */
    async requestPermissions(): Promise<boolean> {
        try {
            const { status } = await Notifications.requestPermissionsAsync();
            return status === 'granted';
        } catch (error) {
            console.error('Error requesting notification permissions:', error);
            return false;
        }
    }

    /**
     * Get push notification token
     */
    async getPushToken(): Promise<string | null> {
        try {
            const hasPermission = await this.requestPermissions();
            if (!hasPermission) {
                return null;
            }

            const token = await Notifications.getExpoPushTokenAsync({
                projectId: process.env.EXPO_PROJECT_ID,
            });

            return token.data;
        } catch (error) {
            console.error('Error getting push token:', error);
            return null;
        }
    }

    /**
     * Schedule a local notification
     */
    async scheduleNotification(
        title: string,
        body: string,
        data?: Record<string, unknown>,
        triggerDate?: Date,
    ): Promise<string | null> {
        try {
            const notificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title,
                    body,
                    data,
                },
                trigger: triggerDate
                    ? { date: triggerDate }
                    : null,
            });

            return notificationId;
        } catch (error) {
            console.error('Error scheduling notification:', error);
            return null;
        }
    }

    /**
     * Cancel a scheduled notification
     */
    async cancelNotification(notificationId: string): Promise<void> {
        try {
            await Notifications.cancelScheduledNotificationAsync(notificationId);
        } catch (error) {
            console.error('Error canceling notification:', error);
        }
    }

    /**
     * Cancel all scheduled notifications
     */
    async cancelAllNotifications(): Promise<void> {
        try {
            await Notifications.cancelAllScheduledNotificationsAsync();
        } catch (error) {
            console.error('Error canceling all notifications:', error);
        }
    }

    /**
     * Get all scheduled notifications
     */
    async getAllScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
        try {
            return await Notifications.getAllScheduledNotificationsAsync();
        } catch (error) {
            console.error('Error getting scheduled notifications:', error);
            return [];
        }
    }

    /**
     * Listen for notification received
     */
    addNotificationReceivedListener(
        listener: (notification: Notifications.Notification) => void,
    ): Notifications.Subscription {
        return Notifications.addNotificationReceivedListener(listener);
    }

    /**
     * Listen for notification response (when user taps notification)
     */
    addNotificationResponseReceivedListener(
        listener: (response: Notifications.NotificationResponse) => void,
    ): Notifications.Subscription {
        return Notifications.addNotificationResponseReceivedListener(listener);
    }

    /**
     * Remove notification listener
     */
    removeNotificationSubscription(subscription: Notifications.Subscription): void {
        Notifications.removeNotificationSubscription(subscription);
    }

    /**
     * Set badge count
     */
    async setBadgeCount(count: number): Promise<void> {
        try {
            await Notifications.setBadgeCountAsync(count);
        } catch (error) {
            console.error('Error setting badge count:', error);
        }
    }

    /**
     * Clear badge
     */
    async clearBadge(): Promise<void> {
        try {
            await Notifications.setBadgeCountAsync(0);
        } catch (error) {
            console.error('Error clearing badge:', error);
        }
    }
}

export const pushNotificationService = new PushNotificationService();
