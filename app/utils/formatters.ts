import { format, formatDistance as formatDistanceDate, formatRelative, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Format phone number to Brazilian format (Progressive Mask)
 */
export function formatPhone(phone: string): string {
    // Remove everything that is not a digit
    let r = phone.replace(/\D/g, "");

    // Truncate to 11 digits
    if (r.length > 11) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
        return r;
    }

    // Apply progressive mask
    if (r.length > 10) {
        // 11 digits: (XX) XXXXX-XXXX
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
        // 6-10 digits: (XX) XXXX-XXXX or partial
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        // 3-5 digits: (XX) XXX...
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else if (r.length > 0) {
        // 1-2 digits: (X...
        r = r.replace(/^(\d*)/, "($1");
    }
    
    return r;
}

/**
 * Format CPF
 */
export function formatCPF(cpf: string): string {
    const cleaned = cpf.replace(/\D/g, '');

    if (cleaned.length === 11) {
        return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
    }

    return cpf;
}

/**
 * Format CEP
 */
export function formatCEP(cep: string): string {
    const cleaned = cep.replace(/\D/g, '');

    if (cleaned.length === 8) {
        return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
    }

    return cep;
}

/**
 * Format currency to Brazilian Real
 */
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

/**
 * Format date to Brazilian format
 */
export function formatDate(date: string | Date): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'dd/MM/yyyy', { locale: ptBR });
}

/**
 * Format date and time to Brazilian format
 */
export function formatDateTime(date: string | Date): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
}

/**
 * Format time only
 */
export function formatTime(date: string | Date): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'HH:mm', { locale: ptBR });
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDistanceDate(dateObj, new Date(), { addSuffix: true, locale: ptBR });
}

/**
 * Format relative date (e.g., "today at 2:30 PM")
 */
export function formatRelativeDate(date: string | Date): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatRelative(dateObj, new Date(), { locale: ptBR });
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Format distance in kilometers
 */
export function formatDistance(distanceKm: number): string {
    if (distanceKm < 1) {
        return `${Math.round(distanceKm * 1000)}m`;
    }
    return `${distanceKm.toFixed(1)}km`;
}

/**
 * Format rating with stars
 */
export function formatRating(rating: number): string {
    const stars = '⭐'.repeat(Math.floor(rating));
    return `${stars} ${rating.toFixed(1)}`;
}
