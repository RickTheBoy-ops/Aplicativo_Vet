import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { SafeAreaView } from '@components/common/SafeAreaView';
import { Header } from '@components/common/Header';
import { PlanCard } from '@components/subscription/PlanCard';
import { SUBSCRIPTION_PLANS } from '../../types/subscription';
import { useAuth } from '@hooks/useAuth';
import { Vet } from '../../types/user';
import { theme } from '@styles/theme';

interface SubscriptionScreenProps {
    navigation: {
        goBack: () => void;
        navigate: (screen: string, params?: { planId: string; billingCycle: 'monthly' | 'yearly' }) => void;
    };
}

export function SubscriptionScreen({ navigation }: SubscriptionScreenProps) {
    const { user } = useAuth();
    const vet = user as Vet;
    const currentPlan = vet?.subscription?.plan || 'free';

    const handleSelectPlan = (planId: string) => {
        if (planId === currentPlan) {
            Alert.alert('Plano Atual', 'Este já é o seu plano atual');
            return;
        }

        if (planId === 'free') {
            Alert.alert('Downgrade', 'Para fazer downgrade, cancele sua assinatura atual');
            return;
        }

        // Show billing cycle selection
        Alert.alert(
            'Escolha o Ciclo de Cobrança',
            'Como deseja pagar?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Mensal',
                    onPress: () => {
                        navigation.navigate('Checkout', {
                            planId,
                            billingCycle: 'monthly',
                        });
                    },
                },
                {
                    text: 'Anual (Desconto)',
                    onPress: () => {
                        navigation.navigate('Checkout', {
                            planId,
                            billingCycle: 'yearly',
                        });
                    },
                },
            ],
        );
    };

    return (
        <SafeAreaView>
            <Header
                title="Assinaturas"
                subtitle="Escolha o melhor plano para você"
                showBack
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Planos VetField</Text>
                    <Text style={styles.subtitle}>
                        Escolha o plano ideal para expandir seus atendimentos
                    </Text>
                </View>

                {SUBSCRIPTION_PLANS.map((plan) => (
                    <PlanCard
                        key={plan.id}
                        plan={plan}
                        isActive={plan.id === currentPlan}
                        onSelect={() => handleSelectPlan(plan.id)}
                    />
                ))}

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        💳 Aceitamos PIX, cartão de créd ito e débito
                    </Text>
                    <Text style={styles.footerText}>
                        🔒 Pagamento 100% seguro e criptografado
                    </Text>
                    <Text style={styles.footerText}>
                        ✨ Cancele quando quiser, sem multas
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
    header: {
        marginBottom: theme.spacing.xl,
    },
    title: {
        fontSize: theme.typography.fontSize.h2,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        lineHeight: theme.typography.lineHeight.body,
    },
    footer: {
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.surfaceDark,
        borderRadius: theme.borderRadius.md,
        gap: theme.spacing.md,
    },
    footerText: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
});
