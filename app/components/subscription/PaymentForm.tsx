import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
} from 'react-native';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { Card } from '@components/common/Card';
import { theme } from '@styles/theme';
import { Ionicons } from '@expo/vector-icons';

interface PaymentFormProps {
    onSubmit: (paymentData: {
        cardNumber: string;
        cardholderName: string;
        expiryDate: string;
        cvv: string;
    }) => Promise<void>;
    amount: number;
    isLoading?: boolean;
}

export function PaymentForm({ onSubmit, amount, isLoading = false }: PaymentFormProps) {
    const [cardNumber, setCardNumber] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const [cardNumberError, setCardNumberError] = useState('');
    const [cardholderNameError, setCardholderNameError] = useState('');
    const [expiryDateError, setExpiryDateError] = useState('');
    const [cvvError, setCvvError] = useState('');

    const formatCardNumber = (text: string) => {
        const cleaned = text.replace(/\s/g, '');
        const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
        return formatted.substring(0, 19); // 16 digits + 3 spaces
    };

    const formatExpiryDate = (text: string) => {
        const cleaned = text.replace(/\//g, '');
        if (cleaned.length >= 2) {
            return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
        }
        return cleaned;
    };

    const validateForm = (): boolean => {
        let isValid = true;

        // Reset errors
        setCardNumberError('');
        setCardholderNameError('');
        setExpiryDateError('');
        setCvvError('');

        // Validate card number (basic validation)
        const cleanedCardNumber = cardNumber.replace(/\s/g, '');
        if (cleanedCardNumber.length !== 16) {
            setCardNumberError('Número do cartão deve ter 16 dígitos');
            isValid = false;
        }

        // Validate cardholder name
        if (cardholderName.trim().length < 3) {
            setCardholderNameError('Nome do titular obrigatório');
            isValid = false;
        }

        // Validate expiry date
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryRegex.test(expiryDate)) {
            setExpiryDateError('Data inválida. Use MM/AA');
            isValid = false;
        } else {
            const [month, year] = expiryDate.split('/');
            const now = new Date();
            const currentYear = now.getFullYear() % 100;
            const currentMonth = now.getMonth() + 1;

            const expMonth = parseInt(month, 10);
            const expYear = parseInt(year, 10);

            if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
                setExpiryDateError('Cartão expirado');
                isValid = false;
            }
        }

        // Validate CVV
        if (cvv.length < 3 || cvv.length > 4) {
            setCvvError('CVV deve ter 3 ou 4 dígitos');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            Alert.alert('Erro', 'Por favor, corrija os erros no formulário');
            return;
        }

        await onSubmit({
            cardNumber: cardNumber.replace(/\s/g, ''),
            cardholderName,
            expiryDate,
            cvv,
        });
    };

    return (
        <View style={styles.container}>
            <Card style={styles.amountCard}>
                <Text style={styles.amountLabel}>Valor a pagar</Text>
                <Text style={styles.amountValue}>
                    R$ {amount.toFixed(2).replace('.', ',')}
                </Text>
            </Card>

            <Card style={styles.formCard}>
                <View style={styles.securityBadge}>
                    <Ionicons name="shield-checkmark" size={20} color={theme.colors.success} />
                    <Text style={styles.securityText}>Pagamento 100% seguro</Text>
                </View>

                <Input
                    label="Número do Cartão"
                    value={cardNumber}
                    onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                    error={cardNumberError}
                    placeholder="1234 5678 9012 3456"
                    keyboardType="numeric"
                    maxLength={19}
                />

                <Input
                    label="Nome do Titular"
                    value={cardholderName}
                    onChangeText={setCardholderName}
                    error={cardholderNameError}
                    placeholder="Como está no cartão"
                    autoCapitalize="characters"
                />

                <View style={styles.row}>
                    <Input
                        label="Validade"
                        value={expiryDate}
                        onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                        error={expiryDateError}
                        placeholder="MM/AA"
                        keyboardType="numeric"
                        maxLength={5}
                        containerStyle={styles.halfInput}
                    />

                    <Input
                        label="CVV"
                        value={cvv}
                        onChangeText={setCvv}
                        error={cvvError}
                        placeholder="123"
                        keyboardType="numeric"
                        secureTextEntry
                        maxLength={4}
                        containerStyle={styles.halfInput}
                    />
                </View>

                <View style={styles.paymentMethods}>
                    <Text style={styles.paymentMethodsLabel}>Aceitamos:</Text>
                    <View style={styles.cardBrands}>
                        <Text style={styles.cardBrand}>💳 Visa</Text>
                        <Text style={styles.cardBrand}>💳 Mastercard</Text>
                        <Text style={styles.cardBrand}>💳 Elo</Text>
                    </View>
                </View>

                <Button
                    title={`Pagar R$ ${amount.toFixed(2).replace('.', ',')}`}
                    onPress={handleSubmit}
                    loading={isLoading}
                    fullWidth
                />
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    amountCard: {
        alignItems: 'center',
        padding: theme.spacing.xl,
        marginBottom: theme.spacing.md,
        backgroundColor: theme.colors.primaryLight + '10',
    },
    amountLabel: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
    },
    amountValue: {
        fontSize: theme.typography.fontSize.h1,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary,
    },
    formCard: {
        marginBottom: theme.spacing.md,
    },
    securityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.success + '10',
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.lg,
    },
    securityText: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.success,
        fontWeight: theme.typography.fontWeight.medium,
        marginLeft: theme.spacing.sm,
    },
    row: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    halfInput: {
        flex: 1,
    },
    paymentMethods: {
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
    },
    paymentMethodsLabel: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
    },
    cardBrands: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    cardBrand: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
    },
});
