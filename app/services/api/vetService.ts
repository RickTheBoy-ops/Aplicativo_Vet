import { apiClient } from './client';
import { ApiResponse, PaginatedResponse, PaginationParams } from '../../types/common';
import { VetSearchFilters, VetSearchResult, VetProfile } from '../../types/vet';
import { Review, Availability, ServiceLocation } from '../../types/user';

class VetService {


    /**
     * Search veterinarians with filters
     */
    async searchVets(
        filters: VetSearchFilters,
        pagination?: PaginationParams,
    ): Promise<ApiResponse<PaginatedResponse<VetSearchResult>>> {
        console.log('[VetService] Searching vets with filters:', filters);

        // Tenta API Real
        const response = await apiClient.get<PaginatedResponse<VetSearchResult>>('/vets/search', {
            params: {
                ...filters,
                ...pagination,
            },
        });

        if (response.success || (response.error && response.error.code !== 'NETWORK_ERROR')) {
            return response;
        }

        console.warn('[VetService] API network error, using MOCK response for preview.');
        // Use inline delay to avoid "this" context issues
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data
        return {
            success: true,
            data: {
                data: [
                    {
                        id: 'mock-vet-1',
                        email: 'dr.silva@email.com',
                        phone: '(11) 99999-9999',
                        name: 'Dr. Silva',
                        userType: 'vet' as const,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        isActive: true,
                        isVerified: true,
                        crmv: '12345-SP',
                        bio: 'Veterinário especializado em clínica geral e dermatologia.',
                        photoUrl: 'https://i.pravatar.cc/150?u=vet1',
                        rating: 4.8,
                        totalReviews: 124,
                        yearsOfExperience: 10,
                        serviceRadius: 15,
                        specialties: [
                            { id: '1', name: 'Clínica Geral', category: 'general' },
                            { id: '2', name: 'Dermatologia', category: 'small_animals' }
                        ],
                        certifications: [
                            { id: 'cert-1', name: 'Especialização em Dermatologia', institution: 'USP', year: 2018 }
                        ],
                        serviceLocations: [
                            {
                                id: 'loc-1',
                                vetId: 'mock-vet-1',
                                name: 'Clínica Veterinária Central',
                                isPrimary: true,
                                address: {
                                    street: 'Rua Augusta',
                                    number: '1000',
                                    neighborhood: 'Consolação',
                                    city: 'São Paulo',
                                    state: 'SP',
                                    zipCode: '01304-001',
                                    country: 'Brasil',
                                    latitude: -23.5505,
                                    longitude: -46.6333
                                }
                            }
                        ],
                        availability: [],
                        subscription: {
                            id: 'sub-1',
                            vetId: 'mock-vet-1',
                            plan: 'premium',
                            status: 'active',
                            startDate: new Date().toISOString(),
                            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                            autoRenew: true,
                            appointmentsUsed: 15,
                            appointmentsLimit: 100
                        },
                        distance: 2.5,
                        nextAvailableSlot: {
                            date: new Date().toISOString().split('T')[0],
                            startTime: '09:00',
                            endTime: '10:00',
                            isAvailable: true
                        },
                        reviews: []
                    },
                    {
                        id: 'mock-vet-2',
                        email: 'dra.santos@email.com',
                        phone: '(11) 98888-8888',
                        name: 'Dra. Santos',
                        userType: 'vet' as const,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        isActive: true,
                        isVerified: true,
                        crmv: '67890-SP',
                        bio: 'Veterinária especializada em cirurgia e ortopedia.',
                        photoUrl: 'https://i.pravatar.cc/150?u=vet2',
                        rating: 4.9,
                        totalReviews: 89,
                        yearsOfExperience: 8,
                        serviceRadius: 20,
                        specialties: [
                            { id: '3', name: 'Cirurgia', category: 'surgery' },
                            { id: '4', name: 'Ortopedia', category: 'surgery' }
                        ],
                        certifications: [
                            { id: 'cert-2', name: 'Especialização em Cirurgia', institution: 'UNESP', year: 2019 }
                        ],
                        serviceLocations: [
                            {
                                id: 'loc-2',
                                vetId: 'mock-vet-2',
                                name: 'Hospital Pet Care',
                                isPrimary: true,
                                address: {
                                    street: 'Av. Paulista',
                                    number: '2000',
                                    neighborhood: 'Bela Vista',
                                    city: 'São Paulo',
                                    state: 'SP',
                                    zipCode: '01310-200',
                                    country: 'Brasil',
                                    latitude: -23.5595,
                                    longitude: -46.6583
                                }
                            }
                        ],
                        availability: [],
                        subscription: {
                            id: 'sub-2',
                            vetId: 'mock-vet-2',
                            plan: 'basic',
                            status: 'active',
                            startDate: new Date().toISOString(),
                            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                            autoRenew: true,
                            appointmentsUsed: 10,
                            appointmentsLimit: 50
                        },
                        distance: 3.8,
                        nextAvailableSlot: {
                            date: new Date().toISOString().split('T')[0],
                            startTime: '14:00',
                            endTime: '15:00',
                            isAvailable: true
                        },
                        reviews: []
                    }
                ],
                pagination: {
                    page: pagination?.page || 1,
                    limit: pagination?.limit || 20,
                    total: 2,
                    totalPages: 1,
                    hasNext: false,
                    hasPrev: false
                }
            }
        };
    }

    /**
     * Get veterinarian profile by ID
     */
    async getVetProfile(vetId: string): Promise<ApiResponse<VetProfile>> {
        const response = await apiClient.get<VetProfile>(`/vets/${vetId}`);
        if (response.success) return response;

        await new Promise(resolve => setTimeout(resolve, 500));

        return {
            success: true,
            data: {
                id: vetId,
                name: 'Dr. Silva',
                email: 'dr.silva@email.com',
                phone: '(11) 99999-9999',
                userType: 'vet',
                isActive: true,
                isVerified: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                crmv: '12345-SP',
                bio: 'Veterinário apaixonado com mais de 10 anos de experiência em clínica médica e dermatologia.',
                photoUrl: 'https://i.pravatar.cc/150?u=vet1',
                rating: 4.8,
                totalReviews: 124,
                yearsOfExperience: 10,
                serviceRadius: 15,
                specialties: [
                    { id: '1', name: 'Clínica Geral', category: 'general' },
                    { id: '2', name: 'Dermatologia', category: 'small_animals' }
                ],
                certifications: [
                    { id: 'cert-1', name: 'Especialização em Dermatologia', institution: 'USP', year: 2018 }
                ],
                serviceLocations: [
                    {
                        id: 'loc-1',
                        vetId: vetId,
                        name: 'Clínica Veterinária Central',
                        isPrimary: true,
                        address: {
                            street: 'Rua Augusta',
                            number: '1000',
                            neighborhood: 'Consolação',
                            city: 'São Paulo',
                            state: 'SP',
                            zipCode: '01304-001',
                            country: 'Brasil',
                            latitude: -23.5505,
                            longitude: -46.6333
                        }
                    }
                ],
                availability: [],
                subscription: {
                    id: 'sub-1',
                    vetId: vetId,
                    plan: 'premium',
                    status: 'active',
                    startDate: new Date().toISOString(),
                    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                    autoRenew: true,
                    appointmentsUsed: 15,
                    appointmentsLimit: 100
                },
                reviews: [],
                upcomingAvailability: []
            }
        };
    }

    /**
     * Get veterinarian reviews
     */
    async getVetReviews(
        vetId: string,
        pagination?: PaginationParams,
    ): Promise<ApiResponse<PaginatedResponse<Review>>> {
        return apiClient.get<PaginatedResponse<Review>>(`/vets/${vetId}/reviews`, {
            params: pagination,
        });
    }

    /**
     * Get veterinarian availability
     */
    async getVetAvailability(vetId: string): Promise<ApiResponse<Availability[]>> {
        return apiClient.get<Availability[]>(`/vets/${vetId}/availability`);
    }

    /**
     * Update veterinarian availability (vet only)
     */
    async updateAvailability(availability: Availability[]): Promise<ApiResponse<Availability[]>> {
        return apiClient.put<Availability[]>('/vets/me/availability', { availability });
    }

    /**
     * Get veterinarian service locations (vet only)
     */
    async getServiceLocations(): Promise<ApiResponse<ServiceLocation[]>> {
        return apiClient.get<ServiceLocation[]>('/vets/me/locations');
    }

    /**
     * Add service location (vet only)
     */
    async addServiceLocation(
        location: Omit<ServiceLocation, 'id' | 'vetId'>,
    ): Promise<ApiResponse<ServiceLocation>> {
        return apiClient.post<ServiceLocation>('/vets/me/locations', location);
    }

    /**
     * Update service location (vet only)
     */
    async updateServiceLocation(
        locationId: string,
        location: Partial<Omit<ServiceLocation, 'id' | 'vetId'>>,
    ): Promise<ApiResponse<ServiceLocation>> {
        return apiClient.patch<ServiceLocation>(`/vets/me/locations/${locationId}`, location);
    }

    /**
     * Delete service location (vet only)
     */
    async deleteServiceLocation(locationId: string): Promise<ApiResponse<void>> {
        return apiClient.delete<void>(`/vets/me/locations/${locationId}`);
    }

    /**
     * Update veterinarian profile (vet only)
     */
    async updateProfile(data: {
        bio?: string;
        photoUrl?: string;
        yearsOfExperience?: number;
        serviceRadius?: number;
    }): Promise<ApiResponse<VetProfile>> {
        return apiClient.patch<VetProfile>('/vets/me/profile', data);
    }
}

export const vetService = new VetService();
