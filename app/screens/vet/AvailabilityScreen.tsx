import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Switch,
    Alert,
} from 'react-native';
import { SafeAreaView } from '@components/common/SafeAreaView';
import { Header } from '@components/common/Header';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Availability, UnavailablePeriod } from '../../types/user';
import { theme } from '@styles/theme';

interface AvailabilityScreenProps {
    navigation: {
        goBack: () => void;
    };
}

export function AvailabilityScreen({ navigation }: AvailabilityScreenProps) {
    // Mock data - in real app, this would come from API
    const [availability, setAvailability] = useState<Availability>({
        monday: { available: true, startTime: '08:00', endTime: '18:00' },
        tuesday: { available: true, startTime: '08:00', endTime: '18:00' },
        wednesday: { available: true, startTime: '08:00', endTime: '18:00' },
        thursday: { available: true, startTime: '08:00', endTime: '18:00' },
        friday: { available: true, startTime: '08:00', endTime: '18:00' },
        saturday: { available: false },
        sunday: { available: false },
    });

    const dayLabels: Record<keyof Availability, string> = {
        monday: 'Segunda-feira',
        tuesday: 'Terça-feira',
        wednesday: 'Quarta-feira',
        thursday: 'Quinta-feira',
        friday: 'Sexta-feira',
        saturday: 'Sábado',
        sunday: 'Domingo',
    };

    const toggleDay = (day: keyof Availability) => {
        setAvailability((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                available: !prev[day]?.available,
            },
        }));
    };

    const handleSave = () => {
        Alert.alert('Sucesso', 'Disponibilidade atualizada com sucesso!');
    };

    return (
        <SafeAreaView>
            <Header
                title="Disponibilidade"
                subtitle="Configure seus horários de atendimento"
                showBack
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView style={styles.container}>
                <Card style={styles.infoCard}>
                    <Text style={styles.infoText}>
                        Configure os dias e horários em que você está disponível para atendimentos
                    </Text>
                </Card>

                <Card>
                    {(Object.keys(dayLabels) as Array<keyof Availability>).map((day) => {
                        const dayData = availability[day];
                        return (
                            <View key={day} style={styles.dayRow}>
                                <View style={styles.dayInfo}>
                                    <Text style={styles.dayLabel}>{dayLabels[day]}</Text>
                                    {dayData?.available && dayData.startTime && dayData.endTime && (
                                        <Text style={styles.dayTime}>
                                            {dayData.startTime} - {dayData.endTime}
                                        </Text>
                                    )}
                                </View>

                                <Switch
                                    value={dayData?.available || false}
                                    onValueChange={() => toggleDay(day)}
                                    trackColor={{
                                        false: theme.colors.border,
                                        true: theme.colors.primary + '50',
                                    }}
                                    thumbColor={dayData?.available ? theme.colors.primary : theme.colors.textLight}
                                />
                            </View>
                        );
                    })}
                </Card>

                <Card style={styles.section}>
                    <Text style={styles.sectionTitle}>Períodos Indisponíveis</Text>
                    <Text style={styles.sectionSubtitle}>
                        Adicione datas específicas em que não estará disponível (férias, eventos, etc.)
                    </Text>

                    <Button
                        title="Adicionar Período"
                        variant="outline"
                        onPress={() => {
                            Alert.alert('Em Desenvolvimento', 'Funcionalidade em breve');
                        }}
                        fullWidth
                        style={styles.addButton}
                    />
                </Card>

                <Button
                    title="Salvar Alterações"
                    onPress={handleSave}
                    fullWidth
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.md,
    },
    infoCard: {
        backgroundColor: theme.colors.primaryLight + '20',
        marginBottom: theme.spacing.md,
    },
    infoText: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.primary,
        lineHeight: theme.typography.lineHeight.body,
    },
    dayRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    dayInfo: {
        flex: 1,
    },
    dayLabel: {
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    dayTime: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
    },
    section: {
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSize.h4,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    sectionSubtitle: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.lg,
        lineHeight: theme.typography.lineHeight.body,
    },
    addButton: {
        marginTop: theme.spacing.md,
    },
});
