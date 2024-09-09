import { Filter, Pageable, PaginationRequest } from '@/data/util'
import {
    ExternalReservationCreateDto,
    ReservationCreateDto,
} from '@/module/reservation/dto/reservation-create.dto'
import { Prisma, Reservation, ReservationStatus } from '@prisma/client'


abstract class ReservationService {
    abstract getRestaurantReservations(
        restaurantId: string,
        pageable: PaginationRequest<Reservation, Prisma.ReservationWhereInput>,
    ): Promise<Pageable<Reservation>>


    abstract getUserReservations(
        userId: string,
        pageable: PaginationRequest<Reservation, Prisma.ReservationWhereInput>,
    ): Promise<Pageable<Reservation>>


    /**
     * Get reservation by id
     */
    abstract getReservationById(reservationId: string): Promise<Reservation>


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
