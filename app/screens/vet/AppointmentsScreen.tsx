import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { SafeAreaView } from '@components/common/SafeAreaView';
import { Header } from '@components/common/Header';
import { Card } from '@components/common/Card';
import { Loading } from '@components/common/Loading';
import { Button } from '@components/common/Button';
import { Booking } from '../../types/booking';
import { bookingService } from '@services/api/bookingService';
import { theme } from '@styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { formatDate, formatTime } from '@utils/formatters';
import { BOOKING_STATUS_LABELS } from '@utils/constants';

interface AppointmentsScreenProps {
    navigation: {
        navigate: (screen: string) => void;
    };
}

export function AppointmentsScreen({ navigation }: AppointmentsScreenProps) {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState<'pending' | 'confirmed' | 'all'>('pending');

    const loadBookings = async () => {
        try {
            setIsLoading(true);
            const response = await bookingService.getBookings(
                filter === 'all' ? {} : { status: [filter] },
            );

            if (response.success && response.data) {
                setBookings(Array.isArray(response.data) ? response.data : response.data.data);
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os agendamentos');
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        loadBookings();
    }, [filter]);

    const handleConfirm = async (bookingId: string) => {
        try {
            const response = await bookingService.confirmBooking(bookingId);
            if (response.success) {
                Alert.alert('Sucesso', 'Agendamento confirmado');
                loadBookings();
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível confirmar o agendamento');
        }
    };

    const handleComplete = async (bookingId: string) => {
        try {
            const response = await bookingService.completeBooking(bookingId);
            if (response.success) {
                Alert.alert('Sucesso', 'Agendamento concluído');
                loadBookings();
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível concluir o agendamento');
        }
    };

    const handleCancel = (bookingId: string) => {
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
                            await bookingService.cancelBooking(bookingId, 'Cancelado pelo veterinário');
                            Alert.alert('Sucesso', 'Agendamento cancelado');
                            loadBookings();
                        } catch (error) {
                            Alert.alert('Erro', 'Não foi possível cancelar');
                        }
                    },
                },
            ],
        );
    };

    const renderBookingCard = ({ item }: { item: Booking }) => {
        const statusInfo = BOOKING_STATUS_LABELS[item.status];
        const isPending = item.status === 'pending';
        const isConfirmed = item.status === 'confirmed';

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
                    <Text style={styles.ownerName}>👤 {item.ownerName || 'Proprietário'}</Text>
                    {item.animal && (
                        <Text style={styles.animalInfo}>
                            🐾 {item.animal.name} - {item.animal.breed}
                        </Text>
                    )}
                </View>

                {item.serviceLocation && (
                    <View style={styles.locationInfo}>
                        <Ionicons name="location-outline" size={16} color={theme.colors.textSecondary} />
                        <Text style={styles.locationText}>
                            {item.serviceLocation.street}, {item.serviceLocation.number} -{' '}
                            {item.serviceLocation.city}
                        </Text>
                    </View>
                )}

                {item.notes && (
                    <Text style={styles.notes} numberOfLines={2}>
                        💬 {item.notes}
                    </Text>
                )}

                <View style={styles.actions}>
                    {isPending && (
                        <>
                            <Button
                                title="Confirmar"
                                size="sm"
                                onPress={() => handleConfirm(item.id)}
                                style={styles.actionButton}
                            />
                            <Button
                                title="Recusar"
                                variant="outline"
                                size="sm"
                                onPress={() => handleCancel(item.id)}
                                style={styles.actionButton}
                            />
                        </>
                    )}

                    {isConfirmed && (
                        <>
                            <Button
                                title="Concluir"
                                size="sm"
                                onPress={() => handleComplete(item.id)}
                                style={styles.actionButton}
                            />
                            <Button
                                title="Cancelar"
                                variant="outline"
                                size="sm"
                                onPress={() => handleCancel(item.id)}
                                style={styles.actionButton}
                            />
                        </>
                    )}
                </View>
            </Card>
        );
    };

    return (
        <SafeAreaView>
            <Header title="Agendamentos" />

            <View style={styles.container}>
                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'pending' && styles.filterButtonActive]}
                        onPress={() => setFilter('pending')}
                    >
                        <Text
                            style={[
                                styles.filterButtonText,
                                filter === 'pending' && styles.filterButtonTextActive,
                            ]}
                        >
                            Pendentes
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'confirmed' && styles.filterButtonActive]}
                        onPress={() => setFilter('confirmed')}
                    >
                        <Text
                            style={[
                                styles.filterButtonText,
                                filter === 'confirmed' && styles.filterButtonTextActive,
                            ]}
                        >
                            Confirmados
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
                        onPress={() => setFilter('all')}
                    >
                        <Text
                            style={[
                                styles.filterButtonText,
                                filter === 'all' && styles.filterButtonTextActive,
                            ]}
                        >
                            Todos
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
                                <Ionicons name="calendar-outline" size={64} color={theme.colors.textSecondary} />
                                <Text style={styles.emptyText}>Nenhum agendamento encontrado</Text>
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
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.surfaceDark,
        alignItems: 'center',
    },
    filterButtonActive: {
        backgroundColor: theme.colors.primary,
    },
    filterButtonText: {
        fontSize: theme.typography.fontSize.small,
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
        fontSize: theme.typography.fontSize.tiny,
        fontWeight: theme.typography.fontWeight.medium,
    },
    bookingInfo: {
        marginBottom: theme.spacing.md,
    },
    ownerName: {
        fontSize: theme.typography.fontSize.h4,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    animalInfo: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
    },
    locationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    locationText: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
        marginLeft: theme.spacing.xs,
        flex: 1,
    },
    notes: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        fontStyle: 'italic',
        marginBottom: theme.spacing.md,
    },
    actions: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    actionButton: {
        flex: 1,
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
