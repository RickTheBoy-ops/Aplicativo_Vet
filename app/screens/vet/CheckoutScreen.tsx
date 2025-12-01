import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from '@components/common/SafeAreaView';
import { Header } from '@components/common/Header';
import { PaymentForm } from '@components/subscription/PaymentForm';
import { Card } from '@components/common/Card';
import { subscriptionService } from '@services/api/subscriptionService';
import { paymentService } from '@services/api/paymentService';
import { SUBSCRIPTION_PLANS, SubscriptionPlanDetails } from '../../types/subscription';
import { theme } from '@styles/theme';

type CheckoutScreenRouteProp = RouteProp<
    { Checkout: { planId: string; billingCycle: 'monthly' | 'yearly' } },
    'Checkout'
>;

interface CheckoutScreenProps {
    route: CheckoutScreenRouteProp;
    navigation: {
        navigate: (screen: string, params?: unknown) => void;
        goBack: () => void;
    };
}

export function CheckoutScreen({ route, navigation }: CheckoutScreenProps) {
    const { planId, billingCycle } = route.params;
    const [isProcessing, setIsProcessing] = useState(false);

    // Find the selected plan
    const selectedPlan = SUBSCRIPTION_PLANS.find((plan) => plan.id === planId);

    if (!selectedPlan) {
        Alert.alert('Erro', 'Plano não encontrado');
        navigation.goBack();
        return null;
    }

    const amount =
        billingCycle === 'yearly'
            ? selectedPlan.yearlyPrice
            : selectedPlan.monthlyPrice;

    const handlePayment = async (paymentData: {
        cardNumber: string;
        cardholderName: string;
        expiryDate: string;
        cvv: string;
    }) => {
        try {
            setIsProcessing(true);

            // Step 1: Create payment intent
            const intentResponse = await paymentService.createPaymentIntent(
                amount,
                'BRL',
                {
                    planId,
                    billingCycle,
                },
            );

            if (!intentResponse.success || !intentResponse.data) {
                throw new Error('Failed to create payment intent');
            }

            // Step 2: Process payment
            const paymentResponse = await paymentService.processPayment({
                amount,
                currency: 'BRL',
                paymentMethodId: 'card', // In real app, this would be from Stripe/payment gateway
                metadata: {
                    planId,
                    billingCycle,
                    intentId: intentResponse.data.id,
                },
            });

            if (!paymentResponse.success) {
                throw new Error(paymentResponse.error?.message || 'Payment failed');
            }

            // Step 3: Upgrade subscription
            const subscriptionResponse = await subscriptionService.upgradeSubscription({
                planId,
                billingCycle,
                paymentMethodId: paymentResponse.data?.id || 'card',
            });

            if (!subscriptionResponse.success) {
                throw new Error('Failed to upgrade subscription');
            }

            // Success!
            Alert.alert(
                'Pagamento Aprovado! 🎉',
                `Sua assinatura ${selectedPlan.name} foi ativada com sucesso!`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Navigate back to dashboard or subscription screen
                            navigation.navigate('Dashboard');
                        },
                    },
                ],
            );
        } catch (error) {
            Alert.alert(
                'Erro no Pagamento',
                error instanceof Error
                    ? error.message
                    : 'Não foi possível processar o pagamento. Tente novamente.',
            );
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <SafeAreaView>
            <Header
                title="Checkout"
                showBack
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView style={styles.container}>
                <Card style={styles.planCard}>
                    <Text style={styles.planTitle}>Resumo do Pedido</Text>

                    <View style={styles.planRow}>
                        <Text style={styles.planLabel}>Plano:</Text>
                        <Text style={styles.planValue}>{selectedPlan.name}</Text>
                    </View>

                    <View style={styles.planRow}>
                        <Text style={styles.planLabel}>Ciclo de Cobrança:</Text>
                        <Text style={styles.planValue}>
                            {billingCycle === 'yearly' ? 'Anual' : 'Mensal'}
                        </Text>
                    </View>

                    <View style={styles.planRow}>
                        <Text style={styles.planLabel}>Agendamentos:</Text>
                        <Text style={styles.planValue}>
                            {selectedPlan.appointmentsPerMonth === -1
                                ? 'Ilimitados'
                                : `${selectedPlan.appointmentsPerMonth}/mês`}
                        </Text>
                    </View>

                    <View style={[styles.planRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total:</Text>
                        <Text style={styles.totalValue}>
                            R$ {amount.toFixed(2).replace('.', ',')}
                        </Text>
                    </View>

                    {billingCycle === 'yearly' && (
                        <Text style={styles.savingsText}>
                            💰 Você economiza R${' '}
                            {(selectedPlan.monthlyPrice * 12 - selectedPlan.yearlyPrice)
                                .toFixed(2)
                                .replace('.', ',')}{' '}
                            por ano!
                        </Text>
                    )}
                </Card>

                <PaymentForm
                    onSubmit={handlePayment}
                    amount={amount}
                    isLoading={isProcessing}
                />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        ✅ Ao confirmar, você concorda com nossos Termos de Uso
                    </Text>
                    <Text style={styles.footerText}>
                        🔒 Seus dados estão protegidos e criptografados
                    </Text>
                    <Text style={styles.footerText}>
                        💳 Renovação automática. Cancele quando quiser
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.md,
    },
    planCard: {
        marginBottom: theme.spacing.md,
    },
    planTitle: {
        fontSize: theme.typography.fontSize.h4,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.lg,
    },
    planRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    planLabel: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
    },
    planValue: {
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.colors.text,
    },
    totalRow: {
        marginTop: theme.spacing.md,
        borderBottomWidth: 0,
    },
    totalLabel: {
        fontSize: theme.typography.fontSize.h4,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
    },
    totalValue: {
        fontSize: theme.typography.fontSize.h4,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary,
    },
    savingsText: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.success,
        textAlign: 'center',
        marginTop: theme.spacing.md,
        fontWeight: theme.typography.fontWeight.medium,
    },
    footer: {
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing['4xl'],
        gap: theme.spacing.sm,
    },
    footerText: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
});
