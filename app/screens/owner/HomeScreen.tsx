import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { SafeAreaView } from '@components/common/SafeAreaView';
import { Header } from '@components/common/Header';
import { Loading } from '@components/common/Loading';
import { SkeletonVetCard } from '@components/common/SkeletonLoaders';
import { Button } from '@components/common/Button';
import { useLocation } from '@hooks/useLocation';
import { vetService } from '@services/api/vetService';
import { VetSearchResult } from '../../types/vet';
import { theme } from '@styles/theme';
import { MAP_CONFIG } from '@utils/constants';
import { VetMarker } from '@components/common/VetMarker';
import { VetCallout } from '@components/common/VetCallout';
import { Ionicons } from '@expo/vector-icons';

interface HomeScreenProps {
    navigation: {
        navigate: (screen: string, params?: unknown) => void;
    };
}

export function HomeScreen({ navigation }: HomeScreenProps) {
    const { location, isLoading: locationLoading, hasPermission, requestPermission } = useLocation();
    const [vets, setVets] = useState<VetSearchResult[]>([]);
    const [isLoadingVets, setIsLoadingVets] = useState(false);
    const [region, setRegion] = useState<Region | null>(null);
    const [showSearchAreaButton, setShowSearchAreaButton] = useState(false);
    const lastSearchedRegion = useRef<Region | null>(null);

    useEffect(() => {
        if (location) {
            const initialRegion = {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };
            setRegion(initialRegion);
            loadNearbyVets(initialRegion);
        }
    }, [location]);

    const loadNearbyVets = async (searchRegion: Region) => {
        try {
            setIsLoadingVets(true);
            setShowSearchAreaButton(false);
            lastSearchedRegion.current = searchRegion;

            const response = await vetService.searchVets(
                {
                    maxDistance: MAP_CONFIG.DEFAULT_RADIUS_KM,
                    latitude: searchRegion.latitude,
                    longitude: searchRegion.longitude,
                },
                { page: 1, limit: 20 },
            );

            if (response.success && response.data) {
                setVets(response.data.data);
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar veterinários próximos');
        } finally {
            setIsLoadingVets(false);
        }
    };

    const handleRegionChange = (newRegion: Region) => {
        setRegion(newRegion);

        if (lastSearchedRegion.current) {
            // Calculate distance or check if moved significantly
            const latDiff = Math.abs(newRegion.latitude - lastSearchedRegion.current.latitude);
            const longDiff = Math.abs(newRegion.longitude - lastSearchedRegion.current.longitude);

            // If moved more than ~1km (rough estimate depending on zoom)
            if (latDiff > 0.01 || longDiff > 0.01) {
                setShowSearchAreaButton(true);
            }
        }
    };

    const handleSearchAreaPress = () => {
        if (region) {
            loadNearbyVets(region);
        }
    };

    const handleMarkerPress = (vet: VetSearchResult) => {
        navigation.navigate('VetDetail', { vetId: vet.id });
    };

    if (locationLoading) {
        return <Loading message="Obtendo sua localização..." />;
    }

    if (!hasPermission) {
        return (
            <SafeAreaView>
                <View style={styles.permissionContainer}>
                    <Text style={styles.permissionTitle}>Permissão de Localização</Text>
                    <Text style={styles.permissionMessage}>
                        Para encontrar veterinários próximos, precisamos acessar sua localização.
                    </Text>
                    <Button title="Permitir Localização" onPress={requestPermission} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <Header
                title="Veterinários Próximos"
                subtitle={`${vets.length} profissionais encontrados`}
                rightComponent={
                    <Button
                        title="Buscar"
                        size="sm"
                        variant="outline"
                        onPress={() => navigation.navigate('Search')}
                    />
                }
            />

            <View style={styles.container}>
                {region && (
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={region}
                        onRegionChangeComplete={handleRegionChange}
                        showsUserLocation
                        showsMyLocationButton
                    >
                        {vets.map((vet) => (
                            <Marker
                                key={vet.id}
                                coordinate={{
                                    latitude: vet.serviceLocations[0]?.address.latitude || 0,
                                    longitude: vet.serviceLocations[0]?.address.longitude || 0,
                                }}
                                title={vet.name}
                                // description is handled by Callout now
                            >
                                <VetMarker imageUrl={vet.avatarUrl} rating={vet.rating} />
                                <VetCallout vet={vet} onPress={() => handleMarkerPress(vet)} />
                            </Marker>
                        ))}
                    </MapView>
                )}

                {showSearchAreaButton && (
                    <TouchableOpacity style={styles.searchAreaButton} onPress={handleSearchAreaPress}>
                        <Text style={styles.searchAreaButtonText}>Pesquisar nesta região</Text>
                        <Ionicons name="refresh" size={16} color={theme.colors.primary} />
                    </TouchableOpacity>
                )}

                {isLoadingVets && (
                    <View style={styles.loadingOverlay}>
                        <Loading size="small" message="Buscando..." />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    permissionTitle: {
        fontSize: theme.typography.fontSize.h2,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
        textAlign: 'center',
    },
    permissionMessage: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
        lineHeight: theme.typography.lineHeight.body,
    },
    map: {
        flex: 1,
    },
    searchAreaButton: {
        position: 'absolute',
        top: theme.spacing.md,
        alignSelf: 'center',
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.full,
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        ...theme.shadows.md,
        zIndex: 10,
    },
    searchAreaButtonText: {
        color: theme.colors.primary,
        fontWeight: theme.typography.fontWeight.semiBold,
        fontSize: theme.typography.fontSize.small,
    },
    loadingOverlay: {
        position: 'absolute',
        bottom: theme.spacing.xl,
        alignSelf: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.sm,
        ...theme.shadows.md,
    },
    skeletonContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.lg,
        gap: theme.spacing.md,
    },
    skeletonCard: {
        marginBottom: 0,
    },
});
