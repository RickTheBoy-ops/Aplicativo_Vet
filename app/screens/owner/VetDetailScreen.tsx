import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from '@components/common/SafeAreaView';
import { Header } from '@components/common/Header';
import { Button } from '@components/common/Button';
import { Loading } from '@components/common/Loading';
import { Card } from '@components/common/Card';
import { RatingCard } from '@components/vet/RatingCard';
import { vetService } from '@services/api/vetService';
import { VetProfile } from '@types/vet';
import { theme } from '@styles/theme';
import { Ionicons } from '@expo/vector-icons';

type VetDetailScreenRouteProp = RouteProp<{ VetDetail: { vetId: string } }, 'VetDetail'>;

interface VetDetailScreenProps {
    route: VetDetailScreenRouteProp;
    navigation: {
        navigate: (screen: string, params?: unknown) => void;
        goBack: () => void;
    };
}

export function VetDetailScreen({ route, navigation }: VetDetailScreenProps) {
    const { vetId } = route.params;
    const [vet, setVet] = useState<VetProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadVetProfile();
    }, [vetId]);

    const loadVetProfile = async () => {
        try {
            setIsLoading(true);
            const response = await vetService.getVetProfile(vetId);

            if (response.success && response.data) {
                setVet(response.data);
            } else {
                Alert.alert('Erro', 'Não foi possível carregar o perfil do veterinário');
                navigation.goBack();
            }
        } catch (error) {
            Alert.alert('Erro', 'Falha ao carregar dados');
            navigation.goBack();
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading || !vet) {
        return <Loading message="Carregando perfil..." />;
    }

    return (
        <SafeAreaView>
            <Header title="Perfil do Veterinário" showBack onBackPress={() => navigation.goBack()} />

            <ScrollView style={styles.container}>
                <Card style={styles.profileCard}>
                    <View style={styles.profileHeader}>
                        <Image
                            source={
                                vet.photoUrl
                                    ? { uri: vet.photoUrl }
                                    : { uri: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(vet.name) + '&background=random' }
                            }
                            style={styles.avatar}
                        />

                        <View style={styles.profileInfo}>
                            <Text style={styles.name}>{vet.name}</Text>
                            <Text style={styles.crmv}>CRMV: {vet.crmv}</Text>

                            <View style={styles.ratingContainer}>
                                <Ionicons name="star" size={20} color={theme.colors.warning} />
                                <Text style={styles.rating}>{vet.rating.toFixed(1)}</Text>
                                <Text style={styles.reviews}>({vet.totalReviews} avaliações)</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.experienceContainer}>
                        <Ionicons name="briefcase-outline" size={20} color={theme.colors.primary} />
                        <Text style={styles.experienceText}>
                            {vet.yearsOfExperience} anos de experiência
                        </Text>
                    </View>
                </Card>

                {vet.bio && (
                    <Card style={styles.section}>
                        <Text style={styles.sectionTitle}>Sobre</Text>
                        <Text style={styles.bio}>{vet.bio}</Text>
                    </Card>
                )}

                <Card style={styles.section}>
                    <Text style={styles.sectionTitle}>Especialidades</Text>
                    <View style={styles.specialties}>
                        {vet.specialties.map((specialty) => (
                            <View key={specialty.id} style={styles.specialtyTag}>
                                <Text style={styles.specialtyText}>{specialty.name}</Text>
                            </View>
                        ))}
                    </View>
                </Card>

                {vet.certifications.length > 0 && (
                    <Card style={styles.section}>
                        <Text style={styles.sectionTitle}>Certificações</Text>
                        {vet.certifications.map((cert) => (
                            <View key={cert.id} style={styles.certification}>
                                <Ionicons name="school-outline" size={20} color={theme.colors.primary} />
                                <View style={styles.certificationInfo}>
                                    <Text style={styles.certificationName}>{cert.name}</Text>
                                    <Text style={styles.certificationDetails}>
                                        {cert.institution} • {cert.year}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </Card>
                )}

                <Card style={styles.section}>
                    <Text style={styles.sectionTitle}>Avaliações</Text>
                    {vet.reviews.length > 0 ? (
                        vet.reviews.slice(0, 5).map((review) => (
                            <RatingCard key={review.id} review={review} />
                        ))
                    ) : (
                        <Text style={styles.noReviews}>Ainda não há avaliações</Text>
                    )}
                </Card>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Agendar Consulta"
                    onPress={() => navigation.navigate('Booking', { vetId: vet.id })}
                    fullWidth
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
    profileCard: {
        marginBottom: theme.spacing.md,
    },
    profileHeader: {
        flexDirection: 'row',
        marginBottom: theme.spacing.lg,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.surfaceDark,
    },
    profileInfo: {
        flex: 1,
        marginLeft: theme.spacing.lg,
        justifyContent: 'center',
    },
    name: {
        fontSize: theme.typography.fontSize.h3,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    crmv: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: theme.typography.fontSize.h4,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginLeft: theme.spacing.xs,
    },
    reviews: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        marginLeft: theme.spacing.sm,
    },
    experienceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.primaryLight + '20',
        borderRadius: theme.borderRadius.md,
    },
    experienceText: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.primary,
        marginLeft: theme.spacing.sm,
        fontWeight: theme.typography.fontWeight.medium,
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
    bio: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.text,
        lineHeight: theme.typography.lineHeight.body,
    },
    specialties: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    specialtyTag: {
        backgroundColor: theme.colors.primaryLight,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        marginRight: theme.spacing.sm,
        marginBottom: theme.spacing.sm,
    },
    specialtyText: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.white,
    },
    certification: {
        flexDirection: 'row',
        marginBottom: theme.spacing.md,
    },
    certificationInfo: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },
    certificationName: {
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    certificationDetails: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
    },
    noReviews: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        padding: theme.spacing.xl,
    },
    footer: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        ...theme.shadows.lg,
    },
});
