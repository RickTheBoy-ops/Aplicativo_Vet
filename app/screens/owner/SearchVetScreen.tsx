import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from '@components/common/SafeAreaView';
import { Header } from '@components/common/Header';
import { Input } from '@components/common/Input';
import { Loading } from '@components/common/Loading';
import { VetCard } from '@components/vet/VetCard';
import { VetFilter } from '@components/vet/VetFilter';
import { vetService } from '@services/api/vetService';
import { VetSearchResult, VetSearchFilters } from '@types/vet';
import { theme } from '@styles/theme';
import { debounce } from '@utils/helpers';

interface SearchVetScreenProps {
    navigation: {
        navigate: (screen: string, params?: unknown) => void;
        goBack: () => void;
    };
}

export function SearchVetScreen({ navigation }: SearchVetScreenProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<VetSearchFilters>({});
    const [vets, setVets] = useState<VetSearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        searchVets(1);
    }, [filters]);

    useEffect(() => {
        debouncedSearch();
    }, [searchQuery]);

    const searchVets = async (pageNumber: number) => {
        try {
            setIsLoading(true);

            const response = await vetService.searchVets(filters, {
                page: pageNumber,
                limit: 20,
            });

            if (response.success && response.data) {
                if (pageNumber === 1) {
                    setVets(response.data.data);
                } else {
                    setVets((prev) => [...prev, ...response.data.data]);
                }

                setHasMore(response.data.pagination.hasNext);
                setPage(pageNumber);
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os veterinários');
        } finally {
            setIsLoading(false);
        }
    };

    const debouncedSearch = debounce(() => {
        searchVets(1);
    }, 500);

    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            searchVets(page + 1);
        }
    };

    const handleVetPress = (vet: VetSearchResult) => {
        navigation.navigate('VetDetail', { vetId: vet.id });
    };

    return (
        <SafeAreaView>
            <Header title="Buscar Veterinários" showBack onBackPress={() => navigation.goBack()} />

            <View style={styles.container}>
                <Input
                    placeholder="Buscar por nome ou CRMV..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    containerStyle={styles.searchInput}
                />

                <VetFilter filters={filters} onFiltersChange={setFilters} />

                <FlatList
                    data={vets}
                    renderItem={({ item }) => (
                        <VetCard vet={item} onPress={() => handleVetPress(item)} />
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        !isLoading ? (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>Nenhum veterinário encontrado</Text>
                            </View>
                        ) : null
                    }
                    ListFooterComponent={isLoading ? <Loading /> : null}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.md,
    },
    searchInput: {
        marginBottom: theme.spacing.md,
    },
    list: {
        paddingBottom: theme.spacing.xl,
    },
    emptyContainer: {
        padding: theme.spacing.xl,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
    },
});
