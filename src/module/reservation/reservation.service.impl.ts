import { Injectable } from '@nestjs/common'
import { ExternalReservationCreateDto } from 'src/module/reservation/dto/reservation-create.dto'

import { Filter, Pageable, PaginationRequest } from 'src/data/util'
import { ReservationStatus } from './model/reservation-status.enum'
import { Reservation } from './model/reservation.model'
import { ReservationRepository } from './reservation.repository'
import { ReservationService } from './reservation.service'

@Injectable()
export class ReservationServiceImpl implements ReservationService {
    constructor(
        private readonly reservationRepository: ReservationRepository
    ) { }

    async getReservationById(reservationId: string): Promise<Reservation> {
        return this.reservationRepository.findOne(reservationId)
    }

    getReservationByUserId(
        userId: string,
        option: {
            pagination: PaginationRequest<Reservation>
            filter: Filter<Reservation>
        }
    ): Promise<Pageable<Reservation>> {
        return this.reservationRepository.findMany({
            filter: { ...option.filter, userId: { is: userId } },
            pageable: option.pagination,
        })
    }

    async getReservationByRestaurantId(
        restaurantId: string,
        option: {
            pagination: PaginationRequest<Reservation>
            filter: Filter<Reservation>
        }
    ): Promise<Pageable<Reservation>> {
        return this.reservationRepository.findMany({
            filter: { ...option.filter, restaurantId: { is: restaurantId } },
            pageable: option.pagination,
        })
    }

    async createReservation(
        reservation: ExternalReservationCreateDto
    ): Promise<Reservation> {
        return this.reservationRepository.createOne(reservation.toEntity())
    }

    async createExternalReservation(
        reservation: ExternalReservationCreateDto
    ): Promise<Reservation> {
        return this.reservationRepository.createOne(reservation.toEntity())
    }

    async updateReservationStatus(
        reservationId: string,
        status: ReservationStatus
    ): Promise<Reservation> {
        const reservation =
            await this.reservationRepository.findOne(reservationId)
        if (!reservation) throw new Error('Reservation not found')
        if (reservation.status !== ReservationStatus.PENDING)
            throw new Error('Reservation status cannot be updated')

        reservation.status = status
        return this.reservationRepository.updateOne(reservationId, reservation)
    }

    async updateReservation(
        reservation: Partial<Reservation>
    ): Promise<Reservation> {
        const originalReservation = await this.reservationRepository.findOne(
            reservation.id
        )
        if (!originalReservation) throw new Error('Reservation not found')
        if (originalReservation.status !== ReservationStatus.PENDING)
            throw new Error('Reservation status cannot be updated')

        return this.reservationRepository.updateOne(reservation.id, reservation)
    }

    async deleteReservation(reservationId: string): Promise<void> {
        return this.reservationRepository.deleteOne(reservationId)
    }
}