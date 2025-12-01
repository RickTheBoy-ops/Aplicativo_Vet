import { apiClient } from './client';
import { ApiResponse, PaginatedResponse, PaginationParams } from '@types/common';
import {
    Booking,
    CreateBookingRequest,
    UpdateBookingRequest,
    BookingFilters,
} from '@types/booking';
import { Review } from '@types/user';

class BookingService {
    /**
     * Create a new booking
     */
    async createBooking(data: CreateBookingRequest): Promise<ApiResponse<Booking>> {
        return apiClient.post<Booking>('/bookings', data);
    }

    /**
     * Get booking by ID
     */
    async getBooking(bookingId: string): Promise<ApiResponse<Booking>> {
        return apiClient.get<Booking>(`/bookings/${bookingId}`);
    }

    /**
     * Get user bookings with filters
     */
    async getBookings(
        filters?: BookingFilters,
        pagination?: PaginationParams,
    ): Promise<ApiResponse<PaginatedResponse<Booking>>> {
        return apiClient.get<PaginatedResponse<Booking>>('/bookings', {
            params: {
                ...filters,
                ...pagination,
            },
        });
    }

    /**
     * Update booking
     */
    async updateBooking(
        bookingId: string,
        data: UpdateBookingRequest,
    ): Promise<ApiResponse<Booking>> {
        return apiClient.patch<Booking>(`/bookings/${bookingId}`, data);
    }

    /**
     * Cancel booking
     */
    async cancelBooking(bookingId: string, reason: string): Promise<ApiResponse<Booking>> {
        return apiClient.post<Booking>(`/bookings/${bookingId}/cancel`, { reason });
    }

    /**
     * Confirm booking (vet only)
     */
    async confirmBooking(bookingId: string): Promise<ApiResponse<Booking>> {
        return apiClient.post<Booking>(`/bookings/${bookingId}/confirm`);
    }

    /**
     * Complete booking (vet only)
     */
    async completeBooking(bookingId: string): Promise<ApiResponse<Booking>> {
        return apiClient.post<Booking>(`/bookings/${bookingId}/complete`);
    }

    /**
     * Submit review for a booking (owner only)
     */
    async submitReview(
        bookingId: string,
        rating: number,
        comment: string,
    ): Promise<ApiResponse<Review>> {
        return apiClient.post<Review>(`/bookings/${bookingId}/review`, {
            rating,
            comment,
        });
    }

    /**
     * Get upcoming bookings
     */
    async getUpcomingBookings(): Promise<ApiResponse<Booking[]>> {
        return apiClient.get<Booking[]>('/bookings/upcoming');
    }

    /**
     * Get past bookings
     */
    async getPastBookings(
        pagination?: PaginationParams,
    ): Promise<ApiResponse<PaginatedResponse<Booking>>> {
        return apiClient.get<PaginatedResponse<Booking>>('/bookings/past', {
            params: pagination,
        });
    }
}

export const bookingService = new BookingService();
