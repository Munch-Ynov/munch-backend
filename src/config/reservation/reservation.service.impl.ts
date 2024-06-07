import { ExternalReservationCreateDto, ReservationCreateDto } from '@/module/reservation/dto/reservation-create.dto'
import { Injectable, NotFoundException, Param } from '@nestjs/common'

import { Filter, Pageable, PaginationRequest } from '@/data/util'
import { ReservationStatus } from '@/module/reservation/model/reservation-status.enum'
import { Reservation } from '@/module/reservation/model/reservation.model'
import { ReservationRepository } from '@/module/reservation/repository/reservation.repository'
import { ReservationService } from '@/module/reservation/service/reservation.service'
import { ParameterException } from '@/exception/parameter-exception'
import { RestaurantRepository } from '@/module/restaurant/repository/restaurant.repository'
import { UserRepository } from '@/module/user/repository/user.repository'


@Injectable()
export class ReservationServiceImpl implements ReservationService {
    constructor(
        private readonly reservationRepository: ReservationRepository,
        private readonly restaurantRepository: RestaurantRepository,
        private readonly userRepository: UserRepository,
    ) { }

    async getReservationById(reservationId: string): Promise<Reservation> {
        const reservation = await this.reservationRepository.findOne(reservationId)
        if (!reservation) return null;
        return reservation;
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


    async #createReservation(
        reservation: Omit<Reservation, "id" | "createdAt" | "updatedAt">
    ): Promise<Reservation> {

        // if null/undefined values
        if (!reservation.date) {
            throw new ParameterException("reservation.date", 'Date is required')
        }
        if (!reservation.nb_people) {
            throw new ParameterException("reservation.nb_people", 'Number of people is required')
        }
        if (!reservation.restaurantId) {
            throw new ParameterException("reservation.restaurantId", 'Restaurant id is required')
        }
        if (!reservation.status) {
            reservation.status = ReservationStatus.PENDING
        }

        // check that the restaurant exists
        if (!(await this.restaurantRepository.findOne(reservation.restaurantId))) {
            throw new ParameterException("reservation.restaurantId", 'Restaurant not found')
        }

        // check that the user exists
        if (
            reservation.userId &&
            !(await this.userRepository.findOne(reservation.userId))) {
            throw new ParameterException("reservation.userId", 'User not found')
        }

        return this.reservationRepository.createOne(reservation)
    }

    async createReservation(
        reservation: ReservationCreateDto
    ): Promise<Reservation> {
        return this.#createReservation(reservation.toEntity())
    }


    async createExternalReservation(
        reservation: ExternalReservationCreateDto
    ): Promise<Reservation> {
        return this.#createReservation(reservation.toEntity())
    }

    async updateReservationStatus(
        reservationId: string,
        status: ReservationStatus
    ): Promise<Reservation> {
        const reservation =
            await this.reservationRepository.findOne(reservationId)

        if (!reservation) {
            throw new NotFoundException('Reservation not found')
        }
        if (reservation.status !== ReservationStatus.PENDING) {
            throw new ParameterException('reservationId', 'Reservation can only be updated if it is pending')
        }

        reservation.status = status
        return this.reservationRepository.updateOne(reservationId, reservation)
    }

    async updateReservation(
        reservation: Partial<Reservation>
    ): Promise<Reservation> {
        const $reservation = await this.reservationRepository.findOne(
            reservation.id
        )
        // check reservation exists
        if (!$reservation) {
            throw new NotFoundException('Reservation not found')
        }

        // a reservation can only be updated if it is pending
        if ($reservation.status !== ReservationStatus.PENDING) {
            throw new ParameterException('reservationId', `Reservation can only be updated if it is pending${$reservation.status}`)
        }

        // check user exists
        if (reservation.userId && !(await this.userRepository.findOne(reservation.userId))) {
            throw new ParameterException("reservation.userId", 'User not found')
        }

        // check restaurant exists
        if (reservation.restaurantId && !(await this.restaurantRepository.findOne(reservation.restaurantId))) {
            throw new ParameterException("reservation.restaurantId", 'Restaurant not found')
        }

        return this.reservationRepository.updateOne(reservation.id, reservation)
    }

    async deleteReservation(reservationId: string): Promise<void> {
        if (!await this.reservationRepository.findOne(reservationId)) {
            throw new NotFoundException('Reservation not found')
        }

        return this.reservationRepository.deleteOne(reservationId)
    }
}
