import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from '@components/common/SafeAreaView';
import { Header } from '@components/common/Header';
import { Card } from '@components/common/Card';
import { Loading } from '@components/common/Loading';
import { Button } from '@components/common/Button';
import { bookingService } from '@services/api/bookingService';
import { Booking, BookingStatus } from '@types/booking';
import { theme } from '@styles/theme';
import { formatDate, formatTime } from '@utils/formatters';
import { BOOKING_STATUS_LABELS } from '@utils/constants';

interface MyBookingsScreenProps {
    navigation: {
        navigate: (screen: string, params?: unknown) => void;
    };
}

export function MyBookingsScreen({ navigation }: MyBookingsScreenProps) {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');

    useEffect(() => {
        loadBookings();
    }, [filter]);

    const loadBookings = async () => {
        try {
            setIsLoading(true);

            const response =
                filter === 'upcoming'
                    ? await bookingService.getUpcomingBookings()
                    : await bookingService.getPastBookings();

            if (response.success && response.data) {
                setBookings(Array.isArray(response.data) ? response.data : response.data.data);
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os agendamentos');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelBooking = (bookingId: string) => {
        Alert.alert(
            'Cancelar Agendamento',
            'Tem certeza que deseja cancelar este agendamento?',
            [
                { text: 'Não', style: 'cancel' },
                {
                    text: 'Sim, cancelar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const response = await bookingService.cancelBooking(
                                bookingId,
                                'Cancelado pelo proprietário',
                            );

                            if (response.success) {
                                Alert.alert('Sucesso', 'Agendamento cancelado');
                                loadBookings();
                            } else {
                                Alert.alert('Erro', 'Não foi possível cancelar o agendamento');
                            }
                        } catch (error) {
                            Alert.alert('Erro', 'Falha ao cancelar agendamento');
                        }
                    },
                },
            ],
        );
    };

    const renderBookingCard = ({ item }: { item: Booking }) => {
        const statusInfo = BOOKING_STATUS_LABELS[item.status];
        const canCancel = item.status === 'pending' || item.status === 'confirmed';

        return (
            <Card style={styles.bookingCard}>
                <View style={styles.bookingHeader}>
                    <View style={styles.bookingDate}>
                        <Ionicons name="calendar-outline" size={20} color={theme.colors.primary} />
                        <Text style={styles.dateText}>
                            {formatDate(item.scheduledDate)} às {formatTime(item.scheduledTime)}
                        </Text>
                    </View>

                    <View style={[styles.statusBadge, { backgroundColor: statusInfo.color + '20' }]}>
                        <Text style={[styles.statusText, { color: statusInfo.color }]}>
                            {statusInfo.label}
                        </Text>
                    </View>
                </View>

                <View style={styles.bookingInfo}>
                    <Text style={styles.vetName}>{item.vetName || 'Veterinário'}</Text>
                    {item.animal && (
                        <Text style={styles.animalName}>🐾 {item.animal.name}</Text>
                    )}
                </View>

                {item.notes && (
                    <Text style={styles.notes} numberOfLines={2}>
                        {item.notes}
                    </Text>
                )}

                {canCancel && (
                    <Button
                        title="Cancelar Agendamento"
                        variant="outline"
                        size="sm"
                        onPress={() => handleCancelBooking(item.id)}
                        style={styles.cancelButton}
                    />
                )}
            </Card>
        );
    };

    return (
        <SafeAreaView>
            <Header title="Meus Agendamentos" />

            <View style={styles.container}>
                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            filter === 'upcoming' && styles.filterButtonActive,
                        ]}
                        onPress={() => setFilter('upcoming')}
                    >
                        <Text
                            style={[
                                styles.filterButtonText,
                                filter === 'upcoming' && styles.filterButtonTextActive,
                            ]}
                        >
                            Próximos
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            filter === 'past' && styles.filterButtonActive,
                        ]}
                        onPress={() => setFilter('past')}
                    >
                        <Text
                            style={[
                                styles.filterButtonText,
                                filter === 'past' && styles.filterButtonTextActive,
                            ]}
                        >
                            Histórico
                        </Text>
                    </TouchableOpacity>
                </View>

                {isLoading ? (
                    <Loading />
                ) : (
                    <FlatList
                        data={bookings}
                        renderItem={renderBookingCard}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Ionicons
                                    name="calendar-outline"
                                    size={64}
                                    color={theme.colors.textSecondary}
                                />
                                <Text style={styles.emptyText}>
                                    {filter === 'upcoming'
                                        ? 'Nenhum agendamento próximo'
                                        : 'Nenhum histórico de agendamentos'}
                                </Text>
                            </View>
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    filterContainer: {
        flexDirection: 'row',
        padding: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    filterButton: {
        flex: 1,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.surfaceDark,
        alignItems: 'center',
    },
    filterButtonActive: {
        backgroundColor: theme.colors.primary,
    },
    filterButtonText: {
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.colors.textSecondary,
    },
    filterButtonTextActive: {
        color: theme.colors.white,
    },
    list: {
        padding: theme.spacing.md,
        paddingTop: 0,
    },
    bookingCard: {
        marginBottom: theme.spacing.md,
    },
    bookingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.md,
    },
    bookingDate: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    dateText: {
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.colors.text,
        marginLeft: theme.spacing.sm,
    },
    statusBadge: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
    },
    statusText: {
        fontSize: theme.typography.fontSize.small,
        fontWeight: theme.typography.fontWeight.medium,
    },
    bookingInfo: {
        marginBottom: theme.spacing.md,
    },
    vetName: {
        fontSize: theme.typography.fontSize.h4,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    animalName: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
    },
    notes: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        fontStyle: 'italic',
        marginBottom: theme.spacing.md,
    },
    cancelButton: {
        marginTop: theme.spacing.sm,
    },
    emptyContainer: {
        alignItems: 'center',
        padding: theme.spacing['4xl'],
    },
    emptyText: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.lg,
        textAlign: 'center',
    },
});
