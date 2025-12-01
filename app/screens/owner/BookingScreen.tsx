import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from '@components/common/SafeAreaView';
import { Header } from '@components/common/Header';
import { Button } from '@components/common/Button';
import { Card } from '@components/common/Card';
import { Input } from '@components/common/Input';
import { bookingService } from '@services/api/bookingService';
import { CreateBookingRequest } from '@types/booking';
import { Address } from '@types/user';
import { theme } from '@styles/theme';

type BookingScreenRouteProp = RouteProp<{ Booking: { vetId: string } }, 'Booking'>;

interface BookingScreenProps {
    route: BookingScreenRouteProp;
    navigation: {
        navigate: (screen: string, params?: unknown) => void;
        goBack: () => void;
    };
}

export function BookingScreen({ route, navigation }: BookingScreenProps) {
    const { vetId } = route.params;

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedAnimalId, setSelectedAnimalId] = useState('');
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Placeholder address - in real app, this would come from user input or GPS
    const [location] = useState<Address>({
        street: 'Rua Exemplo',
        number: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01000-000',
        country: 'Brasil',
    });

    const handleBooking = async () => {
        // Validation
        if (!selectedDate || !selectedTime || !selectedAnimalId) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
            return;
        }

        try {
            setIsLoading(true);

            const bookingData: CreateBookingRequest = {
                vetId,
                animalId: selectedAnimalId,
                scheduledDate: selectedDate,
                scheduledTime: selectedTime,
                serviceLocation: location,
                notes,
            };

            const response = await bookingService.createBooking(bookingData);

            if (response.success && response.data) {
                Alert.alert(
                    'Sucesso!',
                    'Agendamento criado com sucesso. Aguarde a confirmação do veterinário.',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('MyBookings'),
                        },
                    ],
                );
            } else {
                Alert.alert('Erro', response.error?.message || 'Falha ao criar agendamento');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível criar o agendamento');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView>
            <Header
                title="Agendar Consulta"
                showBack
                onBackPress={() => navigation.goBack()}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Card style={styles.section}>
                        <Text style={styles.sectionTitle}>Data e Horário</Text>

                        <Input
                            label="Data"
                            placeholder="dd/mm/aaaa"
                            value={selectedDate}
                            onChangeText={setSelectedDate}
                        />

                        <Input
                            label="Horário"
                            placeholder="HH:mm"
                            value={selectedTime}
                            onChangeText={setSelectedTime}
                        />
                    </Card>

                    <Card style={styles.section}>
                        <Text style={styles.sectionTitle}>Animal</Text>
                        <Text style={styles.helperText}>
                            Selecione qual animal será atendido (implementar seletor)
                        </Text>
                    </Card>

                    <Card style={styles.section}>
                        <Text style={styles.sectionTitle}>Local do Atendimento</Text>
                        <Text style={styles.addressText}>
                            {location.street}, {location.number}
                        </Text>
                        <Text style={styles.addressText}>
                            {location.neighborhood} - {location.city}/{location.state}
                        </Text>
                        <Text style={styles.addressText}>CEP: {location.zipCode}</Text>
                    </Card>

                    <Card style={styles.section}>
                        <Text style={styles.sectionTitle}>Observações</Text>
                        <Input
                            placeholder="Informações adicionais sobre o atendimento..."
                            value={notes}
                            onChangeText={setNotes}
                            multiline
                            numberOfLines={4}
                            style={styles.notesInput}
                        />
                    </Card>

                    <Button
                        title="Confirmar Agendamento"
                        onPress={handleBooking}
                        loading={isLoading}
                        fullWidth
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: theme.spacing.md,
    },
    section: {
        marginBottom: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSize.h4,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    helperText: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
    },
    addressText: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    notesInput: {
        height: 100,
        textAlignVertical: 'top',
    },
});
