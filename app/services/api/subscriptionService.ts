import { apiClient } from './client';
import {
    SubscriptionPlanDetails,
    SubscriptionUpgradeRequest,
    SubscriptionCancellationRequest,
} from '../../types/subscription';
import { ApiResponse } from '../../types/common';
import { Subscription } from '../../types/user';

/**
 * Subscription Service
 * Manages veterinarian subscription plans, upgrades, and cancellations
 */

/**
 * Get current subscription details
 */
export const getCurrentSubscription = async (): Promise<
    ApiResponse<Subscription>
> => {
    try {
        const response = await apiClient.get<ApiResponse<Subscription>>(
            '/subscriptions/current',
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'SUBSCRIPTION_FETCH_ERROR',
                message: 'Failed to fetch subscription',
            },
        };
    }
};

/**
 * Get available subscription plans
 */
export const getAvailablePlans = async (): Promise<
    ApiResponse<SubscriptionPlanDetails[]>
> => {
    try {
        const response = await apiClient.get<ApiResponse<SubscriptionPlanDetails[]>>(
            '/subscriptions/plans',
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'PLANS_FETCH_ERROR',
                message: 'Failed to fetch available plans',
            },
        };
    }
};

/**
 * Upgrade subscription to a new plan
 */
export const upgradeSubscription = async (
    request: SubscriptionUpgradeRequest,
): Promise<ApiResponse<Subscription>> => {
    try {
        const response = await apiClient.post<ApiResponse<Subscription>>(
            '/subscriptions/upgrade',
            request,
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'SUBSCRIPTION_UPGRADE_ERROR',
                message: 'Failed to upgrade subscription',
            },
        };
    }
};

/**
 * Downgrade subscription to a lower plan
 */
export const downgradeSubscription = async (
    planId: string,
): Promise<ApiResponse<Subscription>> => {
    try {
        const response = await apiClient.post<ApiResponse<Subscription>>(
            '/subscriptions/downgrade',
            { planId },
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'SUBSCRIPTION_DOWNGRADE_ERROR',
                message: 'Failed to downgrade subscription',
            },
        };
    }
};

/**
 * Cancel subscription
 */
export const cancelSubscription = async (
    request: SubscriptionCancellationRequest,
): Promise<ApiResponse<void>> => {
    try {
        const response = await apiClient.post<ApiResponse<void>>(
            '/subscriptions/cancel',
            request,
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'SUBSCRIPTION_CANCEL_ERROR',
                message: 'Failed to cancel subscription',
            },
        };
    }
};

/**
 * Reactivate a cancelled subscription
 */
export const reactivateSubscription = async (): Promise<
    ApiResponse<Subscription>
> => {
    try {
        const response = await apiClient.post<ApiResponse<Subscription>>(
            '/subscriptions/reactivate',
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'SUBSCRIPTION_REACTIVATE_ERROR',
                message: 'Failed to reactivate subscription',
            },
        };
    }
};

/**
 * Get subscription usage statistics
 */
export const getSubscriptionUsage = async (): Promise<
    ApiResponse<{
        appointmentsUsed: number;
        appointmentsLimit: number;
        percentageUsed: number;
        daysUntilRenewal: number;
    }>
> => {
    try {
        const response = await apiClient.get<
            ApiResponse<{
                appointmentsUsed: number;
                appointmentsLimit: number;
                percentageUsed: number;
                daysUntilRenewal: number;
            }>
        >('/subscriptions/usage');
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'USAGE_FETCH_ERROR',
                message: 'Failed to fetch subscription usage',
            },
        };
    }
};

export const subscriptionService = {
    getCurrentSubscription,
    getAvailablePlans,
    upgradeSubscription,
    downgradeSubscription,
    cancelSubscription,
    reactivateSubscription,
    getSubscriptionUsage,
};
