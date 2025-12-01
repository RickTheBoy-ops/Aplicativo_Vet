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
import { SafeAreaView } from '@components/common/SafeAreaView';
import { Header } from '@components/common/Header';
import { Card } from '@components/common/Card';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { useAuth } from '@hooks/useAuth';
import { Vet } from '../../types/user';
import { theme } from '@styles/theme';

interface ProfileScreenProps {
    navigation: {
        navigate: (screen: string) => void;
    };
}

export function ProfileScreen({ navigation }: ProfileScreenProps) {
    const { user, logout } = useAuth();
    const vet = user as Vet;

    const [name, setName] = useState(vet?.name || '');
    const [phone, setPhone] = useState(vet?.phone || '');
    const [bio, setBio] = useState(vet?.bio || '');
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveProfile = async () => {
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    };

    const handleLogout = () => {
        Alert.alert('Sair', 'Deseja realmente sair da sua conta?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Sair',
                style: 'destructive',
                onPress: async () => {
                    await logout();
                },
            },
        ]);
    };

    return (
        <SafeAreaView>
            <Header title="Perfil Profissional" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Card style={styles.section}>
                        <Text style={styles.sectionTitle}>Informações Básicas</Text>

                        <Input
                            label="Nome Completo"
                            value={name}
                            onChangeText={setName}
                            placeholder="Seu nome"
                        />

                        <Input
                            label="Email"
                            type="email"
                            value={vet?.email || ''}
                            editable={false}
                            containerStyle={styles.disabledInput}
                        />

                        <Input
                            label="Telefone"
                            type="phone"
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="(99) 99999-9999"
                        />

                        <Input
                            label="CRMV"
                            value={vet?.crmv || ''}
                            editable={false}
                            containerStyle={styles.disabledInput}
                        />
                    </Card>

                    <Card style={styles.section}>
                        <Text style={styles.sectionTitle}>Sobre Você</Text>

                        <Input
                            label="Biografia"
                            value={bio}
                            onChangeText={setBio}
                            placeholder="Conte um pouco sobre sua experiência profissional..."
                            multiline
                            numberOfLines={5}
                            style={styles.bioInput}
                        />
                    </Card>

                    <Card style={styles.section}>
                        <Text style={styles.sectionTitle}>Profissional</Text>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Anos de Experiência:</Text>
                            <Text style={styles.infoValue}>{vet?.yearsOfExperience || 0} anos</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Especialidades:</Text>
                            <Text style={styles.infoValue}>
                                {vet?.specialties?.length || 0} cadastradas
                            </Text>
                        </View>

                        <Button
                            title="Gerenciar Especialidades"
                            variant="outline"
                            onPress={() => {
                                Alert.alert('Em Desenvolvimento', 'Funcionalidade em breve');
                            }}
                            fullWidth
                            style={styles.actionButton}
                        />

                        <Button
                            title="Gerenciar Certificações"
                            variant="outline"
                            onPress={() => {
                                Alert.alert('Em Desenvolvimento', 'Funcionalidade em breve');
                            }}
                            fullWidth
                        />
                    </Card>

                    <Card style={styles.section}>
                        <Button
                            title="Salvar Alterações"
                            onPress={handleSaveProfile}
                            loading={isLoading}
                            fullWidth
                            style={styles.saveButton}
                        />

                        <Button
                            title="Alterar Senha"
                            variant="outline"
                            onPress={() => {
                                Alert.alert('Em Desenvolvimento', 'Funcionalidade em breve');
                            }}
                            fullWidth
                            style={styles.actionButton}
                        />

                        <Button
                            title="Sair da Conta"
                            variant="ghost"
                            onPress={handleLogout}
                            fullWidth
                            textStyle={styles.logoutText}
                        />
                    </Card>
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
    disabledInput: {
        opacity: 0.6,
    },
    bioInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    infoLabel: {
        fontSize: theme.typography.fontSize.body,
        color: theme.colors.textSecondary,
    },
    infoValue: {
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.colors.text,
    },
    saveButton: {
        marginBottom: theme.spacing.md,
    },
    actionButton: {
        marginBottom: theme.spacing.md,
    },
    logoutText: {
        color: theme.colors.error,
    },
});
