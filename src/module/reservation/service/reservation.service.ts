import { Filter, Pageable, PaginationRequest } from '@/data/util'
import {
    ExternalReservationCreateDto,
    ReservationCreateDto,
} from '@/module/reservation/dto/reservation-create.dto'
import { Reservation, ReservationStatus } from '@prisma/client'

abstract class ReservationService {
    getRestaurantReservations(restaurantId: string) {
        throw new Error('Method not implemented.')
    }
    getUserReservations(userId: string) {
        throw new Error('Method not implemented.')
    }
    /**
     * Get reservation by id
     */
    abstract getReservationById(reservationId: string): Promise<Reservation>

    /**
     * Get reservation by user id
     * @param userId
     * @param option
     */
    abstract getReservationByUserId(userId: string): Promise<Reservation[]>

    /**
     * Get reservation by restaurant id
     * @param restaurantId
     * @param option
     */
    abstract getReservationByRestaurantId(
        restaurantId: string
    ): Promise<Reservation[]>

    /**
     * Create a new reservation for a user
     */
    abstract createReservation(
        reservation: ReservationCreateDto
    ): Promise<Reservation>

    /**
     * Create a new External reservation
     */
    // abstract createExternalReservation(
    //     reservation: ExternalReservationCreateDto
    // ): Promise<Reservation>

    /**
     * Update a reservation status
     */
    abstract updateReservationStatus(
        reservationId: string,
        status: ReservationStatus
    ): Promise<Reservation>

    /**
     * Update a reservation
     * Status must be PENDING
     */
    abstract updateReservation(
        reservation: Partial<Reservation>
    ): Promise<Reservation>

    /**
     * Delete a reservation
     * only used for debugging
     */
    abstract deleteReservation(reservationId: string): Promise<void>
}
export { ReservationService }
