import { SubscriptionPlan } from './user';

export interface SubscriptionPlanDetails {
  id: SubscriptionPlan;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  appointmentsPerMonth: number;
  features: SubscriptionFeature[];
  isPopular: boolean;
}

export interface SubscriptionFeature {
  id: string;
  description: string;
  included: boolean;
}

export interface SubscriptionUpgradeRequest {
  plan: SubscriptionPlan;
  billingCycle: 'monthly' | 'yearly';
  paymentMethodId: string;
}

export interface SubscriptionCancellationRequest {
  reason: string;
  feedback?: string;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlanDetails[] = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    appointmentsPerMonth: 2,
    isPopular: false,
    features: [
      { id: '1', description: 'Até 2 agendamentos por mês', included: true },
      { id: '2', description: 'Perfil profissional básico', included: true },
      { id: '3', description: 'Suporte por email', included: false },
      { id: '4', description: 'Destaque nos resultados', included: false },
      { id: '5', description: 'Analytics avançado', included: false },
    ],
  },
  {
    id: 'basic',
    name: 'Basic',
    monthlyPrice: 49.90,
    yearlyPrice: 499.00,
    appointmentsPerMonth: 50,
    isPopular: true,
    features: [
      { id: '1', description: 'Até 50 agendamentos por mês', included: true },
      { id: '2', description: 'Perfil profissional completo', included: true },
      { id: '3', description: 'Suporte por email e chat', included: true },
      { id: '4', description: 'Destaque nos resultados', included: false },
      { id: '5', description: 'Analytics avançado', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: 99.90,
    yearlyPrice: 999.00,
    appointmentsPerMonth: 500,
    isPopular: false,
    features: [
      { id: '1', description: 'Até 500 agendamentos por mês', included: true },
      { id: '2', description: 'Perfil profissional premium', included: true },
      { id: '3', description: 'Suporte prioritário 24/7', included: true },
      { id: '4', description: 'Destaque nos resultados de busca', included: true },
      { id: '5', description: 'Analytics e relatórios avançados', included: true },
      { id: '6', description: 'Badge de verificação', included: true },
    ],
  },
];
