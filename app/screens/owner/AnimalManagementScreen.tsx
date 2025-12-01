import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from '@components/common/SafeAreaView';
import { Header } from '@components/common/Header';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Animal } from '@types/user';
import { theme } from '@styles/theme';
import { ANIMAL_SPECIES } from '@utils/constants';

interface AnimalManagementScreenProps {
    navigation: {
        goBack: () => void;
    };
}

export function AnimalManagementScreen({ navigation }: AnimalManagementScreenProps) {
    // Mock data - in real app, this would come from API
    const [animals, setAnimals] = useState<Animal[]>([
        {
            id: '1',
            name: 'Rex',
            species: 'dog',
            breed: 'Golden Retriever',
            age: 36, // 3 years in months
            weight: 32,
            ownerId: 'owner-1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ]);

    const handleAddAnimal = () => {
        Alert.alert('Em Desenvolvimento', 'Funcionalidade de adicionar animal em breve');
    };

    const handleEditAnimal = (animal: Animal) => {
        Alert.alert('Em Desenvolvimento', `Editar ${animal.name} em breve`);
    };

    const handleDeleteAnimal = (animal: Animal) => {
        Alert.alert(
            'Remover Animal',
            `Tem certeza que deseja remover ${animal.name}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Remover',
                    style: 'destructive',
                    onPress: () => {
                        setAnimals((prev) => prev.filter((a) => a.id !== animal.id));
                        Alert.alert('Sucesso', `${animal.name} foi removido`);
                    },
                },
            ],
        );
    };

    const getSpeciesIcon = (species: Animal['species']): string => {
        const found = ANIMAL_SPECIES.find((s) => s.id === species);
        return found?.icon || '🐾';
    };

    const renderAnimalCard = ({ item }: { item: Animal }) => {
        const ageYears = Math.floor(item.age / 12);
        const ageMonths = item.age % 12;
        const ageText =
            ageYears > 0
                ? `${ageYears} ${ageYears === 1 ? 'ano' : 'anos'}${ageMonths > 0 ? ` e ${ageMonths} ${ageMonths === 1 ? 'mês' : 'meses'}` : ''}`
                : `${ageMonths} ${ageMonths === 1 ? 'mês' : 'meses'}`;

        return (
            <Card style={styles.animalCard}>
                <View style={styles.animalHeader}>
                    <View style={styles.animalIcon}>
                        <Text style={styles.iconText}>{getSpeciesIcon(item.species)}</Text>
                    </View>

                    <View style={styles.animalInfo}>
                        <Text style={styles.animalName}>{item.name}</Text>
                        <Text style={styles.animalBreed}>{item.breed}</Text>
                        <Text style={styles.animalDetails}>
                            {ageText} • {item.weight}kg
                        </Text>
                    </View>

                    <View style={styles.actions}>
                        <TouchableOpacity
                            onPress={() => handleEditAnimal(item)}
                            style={styles.actionButton}
                        >
                            <Ionicons name="create-outline" size={24} color={theme.colors.primary} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleDeleteAnimal(item)}
                            style={styles.actionButton}
                        >
                            <Ionicons name="trash-outline" size={24} color={theme.colors.error} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Card>
        );
    };

    return (
        <SafeAreaView>
            <Header
                title="Meus Animais"
                showBack
                onBackPress={() => navigation.goBack()}
            />

            <View style={styles.container}>
                <FlatList
                    data={animals}
                    renderItem={renderAnimalCard}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    ListHeaderComponent={
                        <Text style={styles.headerText}>
                            Gerencie as informações dos seus pets
                        </Text>
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyIcon}>🐾</Text>
                            <Text style={styles.emptyText}>
                                Você ainda não cadastrou nenhum animal
                            </Text>
                            <Text style={styles.emptySubtext}>
                                Adicione seus pets para agendar consultas
                            </Text>
                        </View>
                    }
                />

                <View style={styles.footer}>
                    <Button
                        title="Adicionar Animal"
                        onPress={handleAddAnimal}
                        fullWidth
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        padding: theme.spacing.md,
    },
    headerText: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.lg,
    },
    animalCard: {
        marginBottom: theme.spacing.md,
    },
    animalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    animalIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.primaryLight + '20',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 32,
    },
    animalInfo: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },
    animalName: {
        fontSize: theme.typography.fontSize.h4,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    animalBreed: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },
    animalDetails: {
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.textSecondary,
    },
    actions: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    actionButton: {
        padding: theme.spacing.sm,
    },
    footer: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        ...theme.shadows.lg,
    },
    emptyContainer: {
        alignItems: 'center',
        padding: theme.spacing['4xl'],
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: theme.spacing.lg,
    },
    emptyText: {
        fontSize: theme.typography.fontSize.h4,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
        textAlign: 'center',
    },
    emptySubtext: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
});
