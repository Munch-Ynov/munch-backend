import { ExternalReservationCreateDto } from 'src/module/reservation/dto/reservation-create.dto'
import { Filter, Pageable, PaginationRequest } from 'src/data/util'
import { Reservation } from './model/reservation.model'
import { ReservationStatus } from './model/reservation-status.enum'
abstract class ReservationService {
    /**
     * Get reservation by id
     */
    abstract getReservationById(reservationId: string): Promise<Reservation>

    /**
     * Get reservation by user id
     * @param userId
     * @param option
     */
    abstract getReservationByUserId(
        userId: string,
        option: {
            pagination: PaginationRequest<Reservation>
            filter: Filter<Reservation>
        }
    ): Promise<Pageable<Reservation>>

    /**
     * Get reservation by restaurant id
     * @param restaurantId
     * @param option
     */
    abstract getReservationByRestaurantId(
        restaurantId: string,
        option: {
            pagination: PaginationRequest<Reservation>
            filter: Filter<Reservation>
        }
    ): Promise<Pageable<Reservation>>

    /**
     * Create a new reservation for a user
     */
    abstract createReservation(
        reservation: ExternalReservationCreateDto
    ): Promise<Reservation>

    /**
     * Create a new External reservation
     */
    abstract createExternalReservation(
        reservation: ExternalReservationCreateDto
    ): Promise<Reservation>

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
