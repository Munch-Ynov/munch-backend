import {
    ExternalReservationCreateDto,
    ReservationCreateDto,
} from '@/module/reservation/dto/reservation-create.dto'
import { Injectable, NotFoundException } from '@nestjs/common'

import { ReservationService } from '@/module/reservation/service/reservation.service'
import { ParameterException } from '@/exception/parameter-exception'
import { PrismaService } from '@/prisma.service'
import { Reservation, ReservationStatus } from '@prisma/client'

@Injectable()
export class ReservationServiceImpl implements ReservationService {
    constructor(private readonly prisma: PrismaService) {}

    async getReservationById(reservationId: string): Promise<Reservation> {
        const reservation = await this.prisma.reservation.findUnique({
            where: { id: reservationId },
        })
        if (!reservation) return null
        return reservation
    }

    getReservationByUserId(userId: string): Promise<Reservation[]> {
        return this.prisma.reservation.findMany({
            where: { userId: userId },
        })
    }

    async getReservationByRestaurantId(
        restaurantId: string
    ): Promise<Reservation[]> {
        return this.prisma.reservation.findMany({
            where: { restaurantId: restaurantId },
        })
    }

    async #createReservation(
        reservation: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<Reservation> {
        // if null/undefined values
        if (!reservation.date) {
            throw new ParameterException('reservation.date', 'Date is required')
        }
        if (!reservation.nb_people) {
            throw new ParameterException(
                'reservation.nb_people',
                'Number of people is required'
            )
        }
        if (!reservation.restaurantId) {
            throw new ParameterException(
                'reservation.restaurantId',
                'Restaurant id is required'
            )
        }
        if (!reservation.status) {
            reservation.status = ReservationStatus.PENDING
        }

        // check that the restaurant exists
        if (
            !(await this.prisma.restaurant.findUnique({
                where: { id: reservation.restaurantId },
            }))
        ) {
            throw new ParameterException(
                'reservation.restaurantId',
                'Restaurant not found'
            )
        }

        // check that the user exists
        if (
            reservation.userId &&
            !(await this.prisma.userProfile.findUnique({
                where: { id: reservation.userId },
            }))
        ) {
            throw new ParameterException('reservation.userId', 'User not found')
        }

        return this.prisma.reservation.create({
            data: reservation,
        })
    }

    async createReservation(
        reservation: ReservationCreateDto
    ): Promise<Reservation> {
        return this.#createReservation(reservation.toEntity())
    }

    // async createExternalReservation(
    //     reservation: ExternalReservationCreateDto
    // ): Promise<Reservation> {
    //     return this.#createReservation(reservation.toEntity())
    // }

    async updateReservationStatus(
        reservationId: string,
        status: ReservationStatus
    ): Promise<Reservation> {
        const reservation = await this.prisma.reservation.findUnique({
            where: { id: reservationId },
        })

        if (!reservation) {
            throw new NotFoundException('Reservation not found')
        }
        if (reservation.status !== ReservationStatus.PENDING) {
            throw new ParameterException(
                'reservationId',
                'Reservation can only be updated if it is pending'
            )
        }

        reservation.status = status
        return this.prisma.reservation.update({
            where: { id: reservationId },
            data: reservation,
        })
    }

    async updateReservation(
        reservation: Partial<Reservation>
    ): Promise<Reservation> {
        const $reservation = await this.prisma.reservation.findUnique({
            where: { id: reservation.id },
        })
        // check reservation exists
        if (!$reservation) {
            throw new NotFoundException('Reservation not found')
        }

        // a reservation can only be updated if it is pending
        if ($reservation.status !== ReservationStatus.PENDING) {
            throw new ParameterException(
                'reservationId',
                `Reservation can only be updated if it is pending${$reservation.status}`
            )
        }

        // check user exists
        if (
            reservation.userId &&
            !(await this.prisma.userProfile.findUnique({
                where: { id: reservation.userId },
            }))
        ) {
            throw new ParameterException('reservation.userId', 'User not found')
        }

        // check restaurant exists
        if (
            reservation.restaurantId &&
            !(await this.prisma.restaurant.findUnique({
                where: { id: reservation.restaurantId },
            }))
        ) {
            throw new ParameterException(
                'reservation.restaurantId',
                'Restaurant not found'
            )
        }

        return this.prisma.reservation.update({
            where: { id: reservation.id },
            data: reservation,
        })
    }

    async deleteReservation(reservationId: string): Promise<void> {
        if (
            !(await this.prisma.reservation.findUnique({
                where: { id: reservationId },
            }))
        ) {
            throw new NotFoundException('Reservation not found')
        }

        await this.prisma.reservation.delete({
            where: { id: reservationId },
        })
    }
}
