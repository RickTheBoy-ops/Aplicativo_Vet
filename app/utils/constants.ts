import { API_CONFIG as CONFIG } from './apiConfig';

// API Configuration
export const API_CONFIG = {
    BASE_URL: CONFIG.BASE_URL,
    TIMEOUT: CONFIG.TIMEOUT,
};

// App Configuration
export const APP_CONFIG = {
    NAME: 'VetField',
    VERSION: '1.0.0',
    SUPPORT_EMAIL: 'support@vetfield.com',
    SUPPORT_PHONE: '(11) 99999-9999',
};

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
};

// Booking
export const BOOKING_CONFIG = {
    MIN_ADVANCE_HOURS: 2,
    MAX_ADVANCE_DAYS: 90,
    DEFAULT_DURATION_MINUTES: 60,
    CANCELLATION_HOURS: 24,
};

// Map Configuration
export const MAP_CONFIG = {
    DEFAULT_LATITUDE: -23.5505,
    DEFAULT_LONGITUDE: -46.6333,
    DEFAULT_ZOOM: 13,
    DEFAULT_RADIUS_KM: 10,
    MAX_RADIUS_KM: 100,
};

// Animal Species
export const ANIMAL_SPECIES = [
    { id: 'dog', label: 'Cachorro', icon: '🐕' },
    { id: 'cat', label: 'Gato', icon: '🐈' },
    { id: 'bird', label: 'Pássaro', icon: '🐦' },
    { id: 'reptile', label: 'Réptil', icon: '🦎' },
    { id: 'rodent', label: 'Roedor', icon: '🐹' },
    { id: 'other', label: 'Outro', icon: '🐾' },
] as const;

// Vet Specialties
export const VET_SPECIALTIES = [
    { id: 'small_animals', label: 'Pequenos Animais', category: 'general' },
    { id: 'large_animals', label: 'Grandes Animais', category: 'general' },
    { id: 'exotics', label: 'Animais Exóticos', category: 'specialty' },
    { id: 'emergency', label: 'Emergência', category: 'specialty' },
    { id: 'surgery', label: 'Cirurgia', category: 'specialty' },
    { id: 'dermatology', label: 'Dermatologia', category: 'specialty' },
    { id: 'cardiology', label: 'Cardiologia', category: 'specialty' },
    { id: 'dentistry', label: 'Odontologia', category: 'specialty' },
    { id: 'orthopedics', label: 'Ortopedia', category: 'specialty' },
    { id: 'neurology', label: 'Neurologia', category: 'specialty' },
] as const;

// Booking Status Labels
export const BOOKING_STATUS_LABELS = {
    pending: { label: 'Pendente', color: '#A84B2F' },
    confirmed: { label: 'Confirmado', color: '#2180CD' },
    in_progress: { label: 'Em Andamento', color: '#218C8D' },
    completed: { label: 'Concluído', color: '#218C8D' },
    cancelled_by_owner: { label: 'Cancelado pelo Proprietário', color: '#C0152F' },
    cancelled_by_vet: { label: 'Cancelado pelo Veterinário', color: '#C0152F' },
    no_show: { label: 'Não Compareceu', color: '#62726D' },
} as const;

// Payment Status Labels
export const PAYMENT_STATUS_LABELS = {
    pending: { label: 'Pendente', color: '#A84B2F' },
    processing: { label: 'Processando', color: '#2180CD' },
    succeeded: { label: 'Aprovado', color: '#218C8D' },
    failed: { label: 'Falhou', color: '#C0152F' },
    cancelled: { label: 'Cancelado', color: '#62726D' },
    refunded: { label: 'Reembolsado', color: '#5E5240' },
} as const;

// Rating Range
export const RATING_RANGE = {
    MIN: 1,
    MAX: 5,
    DEFAULT: 5,
};

// Days of Week
export const DAYS_OF_WEEK = [
    { id: 0, label: 'Domingo', short: 'Dom' },
    { id: 1, label: 'Segunda-feira', short: 'Seg' },
    { id: 2, label: 'Terça-feira', short: 'Ter' },
    { id: 3, label: 'Quarta-feira', short: 'Qua' },
    { id: 4, label: 'Quinta-feira', short: 'Qui' },
    { id: 5, label: 'Sexta-feira', short: 'Sex' },
    { id: 6, label: 'Sábado', short: 'Sáb' },
] as const;
