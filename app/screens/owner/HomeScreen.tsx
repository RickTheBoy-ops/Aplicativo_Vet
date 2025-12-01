import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from '@components/common/SafeAreaView';
import { Header } from '@components/common/Header';
import { Loading } from '@components/common/Loading';
import { Button } from '@components/common/Button';
import { useLocation } from '@hooks/useLocation';
import { vetService } from '@services/api/vetService';
import { VetSearchResult } from '@types/vet';
import { theme } from '@styles/theme';
import { MAP_CONFIG } from '@utils/constants';

interface HomeScreenProps {
    navigation: {
        navigate: (screen: string, params?: unknown) => void;
    };
}

export function HomeScreen({ navigation }: HomeScreenProps) {
    const { location, isLoading: locationLoading, hasPermission, requestPermission } = useLocation();
    const [vets, setVets] = useState<VetSearchResult[]>([]);
    const [isLoadingVets, setIsLoadingVets] = useState(false);

    useEffect(() => {
        if (location) {
            loadNearbyVets();
        }
    }, [location]);

    const loadNearbyVets = async () => {
        if (!location) return;

        try {
            setIsLoadingVets(true);
            const response = await vetService.searchVets(
                {
                    maxDistance: MAP_CONFIG.DEFAULT_RADIUS_KM,
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
                {location && (
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
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
                                description={`⭐ ${vet.rating.toFixed(1)} • CRMV: ${vet.crmv}`}
                                onPress={() => handleMarkerPress(vet)}
                            >
                                <View style={styles.marker}>
                                    <Text style={styles.markerText}>🏥</Text>
                                </View>
                            </Marker>
                        ))}
                    </MapView>
                )}

                {isLoadingVets && (
                    <View style={styles.loadingOverlay}>
                        <Loading message="Carregando veterinários..." />
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
    marker: {
        backgroundColor: theme.colors.white,
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.full,
        ...theme.shadows.md,
    },
    markerText: {
        fontSize: 24,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: theme.colors.overlay,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
