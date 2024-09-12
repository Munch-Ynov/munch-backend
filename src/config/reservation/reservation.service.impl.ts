import { Request } from 'express';
import {
    ExternalReservationCreateDto,
    ReservationCreateDto,
} from '@/module/reservation/dto/reservation-create.dto'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'

import { ReservationService } from '@/module/reservation/service/reservation.service'
import { ParameterException } from '@/exception/parameter-exception'
import { PrismaService } from '@/prisma.service'
import { Prisma, Reservation, ReservationStatus } from '@prisma/client'
import { Pageable, PaginationRequest } from '@/data/util'
import { MailingService } from '@/module/mailing/mailing.service';

@Injectable()
export class ReservationServiceImpl implements ReservationService {
    constructor(private readonly prisma: PrismaService,
        private readonly mailingService: MailingService
    ) { }

    async getReservationById(reservationId: string): Promise<Reservation> {
        const reservation = await this.prisma.reservation.findUnique({
            where: { id: reservationId },
        })
        if (!reservation) return null
        return reservation
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

        let user = null;

        // check that the user exists
        if (reservation.userId) {
            user = await this.prisma.userProfile.findUnique({
                where: { id: reservation.userId },
            })

            if (!user) {
                throw new ParameterException('reservation.userId', 'User not found')
            }

        } else {
            Logger.warn('No user found for reservation , considering external Reservation')
        }

        const reservationReturn = await this.prisma.reservation.create({
            data: reservation,
        })

        if (user) {
            // send email
            this.mailingService.sendMail({
                from: process.env.MAILGUN_FROM,
                to: user.email,
                subject: `Reservation ${reservationReturn.id} created`,
                text: `Your reservation ${reservationReturn.id} has been created for ${reservation.date} at ${reservation.restaurantId}`,
            })
        }

        return reservationReturn

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

    async getUserReservations(
        userId: string,
        request: PaginationRequest<Reservation, Prisma.ReservationWhereInput>,
        {
            past = true,
            upcoming = true,
        }: {
            past?: boolean; upcoming?: boolean
        }
    ): Promise<Pageable<Reservation>> {

        const count = await this.prisma.reservation.count({
            where: {
                userId: userId,
                date: {
                    ...(!past ? { gte: new Date() } : {}),
                    ...(!upcoming ? { lt: new Date() } : {}),
                },
            },
        })

        return this.prisma.reservation.findMany({
            skip: request.page * request.size,
            take: request.size,
            orderBy: request.sort.getSort(),
            where: {
                userId: userId,
                date: {
                    ...(!past ? { gte: new Date() } : {}),
                    ...(!upcoming ? { lt: new Date() } : {}),
                },
            },
        }).then((reservations) => Pageable.of({
            content: reservations,
            totalElements: count,
            request: request,
        }));
    }


    async getRestaurantReservations(
        restaurantId: string,
        request: PaginationRequest<Reservation, Prisma.ReservationWhereInput>,
        {
            past = true,
            upcoming = true,
        }: {
            past?: boolean; upcoming?: boolean
        }
    ): Promise<Pageable<Reservation>> {
        const count = await this.prisma.reservation.count({
            where: {
                restaurantId: restaurantId,
                date: {
                    ...(!past ? { gte: new Date() } : {}),
                    ...(!upcoming ? { lt: new Date() } : {}),
                },
            },
        })


        return this.prisma.reservation.findMany({
            skip: request.page * request.size,
            take: request.size,
            orderBy: request.sort.getSort(),
            where: {
                restaurantId: restaurantId,
                date: {
                    ...(!past ? { gte: new Date() } : {}),
                    ...(!upcoming ? { lt: new Date() } : {}),
                },
            },
        }).then((reservations) => Pageable.of({
            content: reservations,
            totalElements: count,
            request: request,
        }));
    }


    async getUpcomingReservations(
        restaurantId: string,
        request: PaginationRequest<Reservation, Prisma.ReservationWhereInput>
    ): Promise<Pageable<Reservation>> {

        const count = await this.prisma.reservation.count({
            where: {
                restaurantId: restaurantId,
                date: {
                    gte: new Date(),
                },
                status: {
                    notIn: [ReservationStatus.REFUSED, ReservationStatus.CANCELED]
                }
            },
        })

        return this.prisma.reservation.findMany({
            skip: request.page * request.size,
            take: request.size,
            // order by date
            orderBy: {
                date: 'asc',
            },
            where: {
                restaurantId: restaurantId,
                date: {
                    gte: new Date(),
                },
                status: {
                    notIn: [ReservationStatus.REFUSED, ReservationStatus.CANCELED]
                }
            },
        }).then((reservations) => Pageable.of({
            content: reservations,
            totalElements: count,
            request: request,
        }));
    }
}
