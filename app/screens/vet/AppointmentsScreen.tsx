import React, { useState, useCallback, memo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    RefreshControl,
    ScrollView
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import Swipeable from 'react-native-gesture-handler/Swipeable';
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

// Date Filter Chips Data
const DATE_FILTERS = [
    { id: 'all', label: 'Todos' },
    { id: 'today', label: 'Hoje' },
    { id: 'tomorrow', label: 'Amanhã' },
    { id: 'week', label: 'Esta Semana' },
] as const;

type DateFilterType = typeof DATE_FILTERS[number]['id'];

// Memoized Booking Card Component
const BookingCardItem = memo(({
    item,
    onConfirm,
    onComplete,
    onCancel
}: {
    item: Booking;
    onConfirm: (id: string) => void;
    onComplete: (id: string) => void;
    onCancel: (id: string) => void;
}) => {
    const statusInfo = BOOKING_STATUS_LABELS[item.status];

    const renderRightActions = () => {
        if (item.status === 'pending' || item.status === 'confirmed') {
            return (
                <TouchableOpacity
                    style={[styles.swipeAction, { backgroundColor: theme.colors.error }]}
                    onPress={() => onCancel(item.id)}
                >
                     <Ionicons name="close-circle-outline" size={24} color="#fff" />
                     <Text style={styles.swipeActionText}>
                         {item.status === 'pending' ? 'Recusar' : 'Cancelar'}
                     </Text>
                </TouchableOpacity>
            );
        }
        return null;
    };

    const renderLeftActions = () => {
        if (item.status === 'pending') {
            return (
                <TouchableOpacity
                    style={[styles.swipeAction, { backgroundColor: theme.colors.success }]}
                    onPress={() => onConfirm(item.id)}
                >
                    <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
                    <Text style={styles.swipeActionText}>Confirmar</Text>
                </TouchableOpacity>
            );
        }
         if (item.status === 'confirmed') {
            return (
                <TouchableOpacity
                    style={[styles.swipeAction, { backgroundColor: theme.colors.success }]}
                    onPress={() => onComplete(item.id)}
                >
                    <Ionicons name="checkmark-done-circle-outline" size={24} color="#fff" />
                    <Text style={styles.swipeActionText}>Concluir</Text>
                </TouchableOpacity>
            );
        }
        return null;
    };

    return (
        <Swipeable
            renderRightActions={renderRightActions}
            renderLeftActions={renderLeftActions}
        >
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

                <View style={styles.swipeHint}>
                    <Text style={styles.swipeHintText}>Deslize para ações</Text>
                </View>
            </Card>
        </Swipeable>
    );
});

export function AppointmentsScreen({ navigation }: AppointmentsScreenProps) {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [statusFilter, setStatusFilter] = useState<'pending' | 'confirmed' | 'all'>('pending');
    const [dateFilter, setDateFilter] = useState<DateFilterType>('all');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loadBookings = async (pageNum = 1, shouldRefresh = false) => {
        if (isLoading) return;

        try {
            if (pageNum === 1) setIsLoading(true);

            const params: any = {
                page: pageNum,
                limit: 20
            };

            if (statusFilter !== 'all') {
                params.status = [statusFilter];
            }

            const response = await bookingService.getBookings(params);

            if (response.success && response.data) {
                let data = Array.isArray(response.data) ? response.data : response.data.data;

                // Client-side filtering for date (mock logic)
                if (dateFilter !== 'all') {
                    const now = new Date();
                    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    const nextWeek = new Date(today);
                    nextWeek.setDate(nextWeek.getDate() + 7);

                    data = data.filter((item: Booking) => {
                        const itemDate = new Date(item.scheduledDate);
                        const itemDay = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());

                        if (dateFilter === 'today') {
                            return itemDay.getTime() === today.getTime();
                        }
                        if (dateFilter === 'tomorrow') {
                            return itemDay.getTime() === tomorrow.getTime();
                        }
                        if (dateFilter === 'week') {
                            return itemDay >= today && itemDay <= nextWeek;
                        }
                        return true;
                    });
                }

                if (shouldRefresh || pageNum === 1) {
                    setBookings(data);
                } else {
                    setBookings(prev => [...prev, ...data]);
                }

                // Check if we reached the end (mock logic, normally provided by API meta)
                if (data.length < 20) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
                setPage(pageNum);
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os agendamentos');
        } finally {
            setIsLoading(false);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadBookings(1, true);
        setRefreshing(false);
    }, [statusFilter, dateFilter]);

    const onEndReached = useCallback(() => {
        if (!isLoading && hasMore) {
            loadBookings(page + 1);
        }
    }, [isLoading, hasMore, page, statusFilter, dateFilter]);

    React.useEffect(() => {
        loadBookings(1, true);
    }, [statusFilter, dateFilter]);

    const handleConfirm = useCallback(async (bookingId: string) => {
        try {
            const response = await bookingService.confirmBooking(bookingId);
            if (response.success) {
                // Optimistically update or reload
                loadBookings(1, true);
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível confirmar o agendamento');
        }
    }, []);

    const handleComplete = useCallback(async (bookingId: string) => {
        try {
            const response = await bookingService.completeBooking(bookingId);
            if (response.success) {
                loadBookings(1, true);
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível concluir o agendamento');
        }
    }, []);

    const handleCancel = useCallback((bookingId: string) => {
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
                            loadBookings(1, true);
                        } catch (error) {
                            Alert.alert('Erro', 'Não foi possível cancelar');
                        }
                    },
                },
            ],
        );
    }, []);

    const renderBookingCard = useCallback(({ item }: { item: Booking }) => {
        return (
            <BookingCardItem
                item={item}
                onConfirm={handleConfirm}
                onComplete={handleComplete}
                onCancel={handleCancel}
            />
        );
    }, [handleConfirm, handleComplete, handleCancel]);

    return (
        <SafeAreaView>
            <Header title="Agendamentos" />

            <View style={styles.container}>
                {/* Date Filters */}
                <View style={styles.dateFilterContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateFilterScroll}>
                        {DATE_FILTERS.map((filterItem) => (
                            <TouchableOpacity
                                key={filterItem.id}
                                style={[
                                    styles.chip,
                                    dateFilter === filterItem.id && styles.chipActive
                                ]}
                                onPress={() => setDateFilter(filterItem.id)}
                            >
                                <Text style={[
                                    styles.chipText,
                                    dateFilter === filterItem.id && styles.chipTextActive
                                ]}>
                                    {filterItem.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Status Filters */}
                <View style={styles.filterContainer}>
                    {(['pending', 'confirmed', 'all'] as const).map((s) => (
                         <TouchableOpacity
                            key={s}
                            style={[styles.filterButton, statusFilter === s && styles.filterButtonActive]}
                            onPress={() => setStatusFilter(s)}
                        >
                            <Text
                                style={[
                                    styles.filterButtonText,
                                    statusFilter === s && styles.filterButtonTextActive,
                                ]}
                            >
                                {s === 'pending' ? 'Pendentes' : s === 'confirmed' ? 'Confirmados' : 'Todos'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {isLoading && !refreshing && page === 1 ? (
                    <Loading />
                ) : (
                    <FlashList
                        data={bookings}
                        renderItem={renderBookingCard}
                        estimatedItemSize={200}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.5}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Ionicons name="calendar-outline" size={64} color={theme.colors.textSecondary} />
                                <Text style={styles.emptyText}>Nenhum agendamento encontrado</Text>
                            </View>
                        }
                        ListFooterComponent={
                            isLoading && page > 1 ? (
                                <View style={{ padding: 10 }}>
                                    <Loading size="small" />
                                </View>
                            ) : null
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
    dateFilterContainer: {
        paddingVertical: theme.spacing.sm,
        backgroundColor: theme.colors.background,
    },
    dateFilterScroll: {
        paddingHorizontal: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    chip: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    chipActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    chipText: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.text,
    },
    chipTextActive: {
        color: theme.colors.white,
        fontWeight: theme.typography.fontWeight.medium,
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
        backgroundColor: theme.colors.white, // Ensure white background for swipeable
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
    swipeAction: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: '100%',
        marginBottom: theme.spacing.md, // Match card margin
        borderRadius: theme.borderRadius.md, // Match card radius if possible, but swipeable usually hides it
    },
    swipeActionText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: 4,
    },
    swipeHint: {
        alignItems: 'center',
        marginTop: theme.spacing.sm,
    },
    swipeHintText: {
        fontSize: 10,
        color: theme.colors.textSecondary,
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
