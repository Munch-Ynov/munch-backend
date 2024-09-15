import {
    ReservationCreateDto
} from '@/module/reservation/dto/reservation-create.dto'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'

import { Pageable, PaginationRequest } from '@/data/util'
import { ParameterException } from '@/exception/parameter-exception'
import { MailingService } from '@/module/mailing/mailing.service'
import { ReservationService } from '@/module/reservation/service/reservation.service'
import { PrismaService } from '@/prisma.service'
import { Prisma, Reservation, ReservationStatus, Role } from '@prisma/client'

@Injectable()
export class ReservationServiceImpl implements ReservationService {
    constructor(
        private readonly prisma: PrismaService,
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

        let user = null

        // check that the user exists
        if (reservation.userId) {
            user = await this.prisma.userProfile.findUnique({
                where: { id: reservation.userId },
            })

            if (!user) {
                throw new ParameterException(
                    'reservation.userId',
                    'User not found'
                )
            }
        } else {
            Logger.warn(
                'No user found for reservation , considering external Reservation'
            )
        }

        const authUser = await this.prisma.auth.findUnique({
            where: {
                id: reservation.userId,
                role: Role.USER,
            },
        })

        const reservationReturn = await this.prisma.reservation.create({
            data: reservation,
        })

        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id: reservation.restaurantId },
        })


        if (user) {
            // send email to user
            this.sendReservationMail({
                username: user.username,
                restaurantName: restaurant.name,
                reservationDate: reservationReturn.date.toISOString().split('T')[0],
                reservationTime: reservationReturn.date.toISOString().split('T')[1].split('.')[0],
                userEmail: authUser.email,
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
            available = false,
        }: {
            past?: boolean
            upcoming?: boolean
            available?: boolean
        }
    ): Promise<Pageable<Reservation>> {
        const count = await this.prisma.reservation.count({
            where: {
                userId: userId,
                date: {
                    ...(!past ? { gte: new Date() } : {}),
                    ...(!upcoming ? { lt: new Date() } : {}),
                },
                status: {
                    ...(available
                        ? {
                            notIn: [
                                ReservationStatus.REFUSED,
                                ReservationStatus.CANCELED,
                            ],
                        }
                        : {}),
                },
            },
        })

        return this.prisma.reservation
            .findMany({
                skip: request.page * request.size,
                take: request.size,
                orderBy: request.sort.getSort(),
                where: {
                    userId: userId,
                    date: {
                        ...(!past ? { gte: new Date() } : {}),
                        ...(!upcoming ? { lt: new Date() } : {}),
                    },
                    status: {
                        ...(available
                            ? {
                                notIn: [
                                    ReservationStatus.REFUSED,
                                    ReservationStatus.CANCELED,
                                ],
                            }
                            : {}),
                    },
                },
            })
            .then((reservations) =>
                Pageable.of({
                    content: reservations,
                    totalElements: count,
                    request: request,
                })
            )
    }

    async getRestaurantReservations(
        restaurantId: string,
        request: PaginationRequest<Reservation, Prisma.ReservationWhereInput>,
        {
            past = true,
            upcoming = true,
            available = false,
        }: {
            past?: boolean
            upcoming?: boolean
            available?: boolean
        }
    ): Promise<Pageable<Reservation>> {
        const count = await this.prisma.reservation.count({
            where: {
                restaurantId: restaurantId,
                date: {
                    ...(!past ? { gte: new Date() } : {}),
                    ...(!upcoming ? { lt: new Date() } : {}),
                },
                status: {
                    ...(available
                        ? {
                            notIn: [
                                ReservationStatus.REFUSED,
                                ReservationStatus.CANCELED,
                            ],
                        }
                        : {}),
                },
            },
        })

        return this.prisma.reservation
            .findMany({
                skip: request.page * request.size,
                take: request.size,
                orderBy: request.sort.getSort(),
                where: {
                    restaurantId: restaurantId,
                    date: {
                        ...(!past ? { gte: new Date() } : {}),
                        ...(!upcoming ? { lt: new Date() } : {}),
                    },
                    status: {
                        ...(available
                            ? {
                                notIn: [
                                    ReservationStatus.REFUSED,
                                    ReservationStatus.CANCELED,
                                ],
                            }
                            : {}),
                    }
                },
            })
            .then((reservations) =>
                Pageable.of({
                    content: reservations,
                    totalElements: count,
                    request: request,
                })
            )
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
                    notIn: [
                        ReservationStatus.REFUSED,
                        ReservationStatus.CANCELED,
                    ],
                },
            },
        })

        return this.prisma.reservation
            .findMany({
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
                        notIn: [
                            ReservationStatus.REFUSED,
                            ReservationStatus.CANCELED,
                        ],
                    },
                },
            })
            .then((reservations) =>
                Pageable.of({
                    content: reservations,
                    totalElements: count,
                    request: request,
                })
            )
    }



    async sendReservationMail(reservation: {
        username: string;
        restaurantName: string;
        reservationDate: string;
        reservationTime: string;
        userEmail: string;
    }
    ) {
        const { username, restaurantName, reservationDate, reservationTime } = reservation;

        // Create calendar invite (ICS file)
        const icsContent = this.createICSFile(reservationDate, reservationTime, restaurantName);

        // Email content in French
        const emailData = {
            from: `Munch - ${restaurantName} <no-reply@munch.rest>`,
            to: reservation.userEmail, // Email of the user
            subject: `Confirmation de réservation - ${restaurantName}`,
            text: `Bonjour ${username},\n\nVotre réservation au restaurant ${restaurantName} pour le ${reservationDate} à ${reservationTime} a été confirmée.\n\nVeuillez trouver les détails de votre réservation ci-dessous :\n- Nom du restaurant : ${restaurantName}\n- Date : ${reservationDate}\n- Heure : ${reservationTime}\n\nVous pouvez ajouter cette réservation à votre calendrier en pièce jointe.`,
            attachment: {
                filename: 'reservation.ics',
                data: Buffer.from(icsContent, 'utf-8'),
            },
        };

        try {
            await this.mailingService.sendMail(emailData);
            console.log('Reservation email sent successfully.');
        } catch (error) {
            console.error('Error sending reservation email:', error);
        }
    }

    private createICSFile(reservationDate: string, reservationTime: string, restaurantName: string): string {
        const date = new Date(`${reservationDate}T${reservationTime}`);
        const startDate = this.formatDateICS(date);
        const endDate = this.formatDateICS(new Date(date.getTime() + 2 * 60 * 60 * 1000)); // Assume 2-hour reservation

        return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Munch//Reservation//EN
BEGIN:VEVENT
UID:${new Date().getTime()}@yourdomain.com
DTSTAMP:${this.formatDateICS(new Date())}
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:Réservation au restaurant ${restaurantName}
DESCRIPTION:Votre réservation au restaurant ${restaurantName} a été confirmée.
END:VEVENT
END:VCALENDAR`;
    }

    private formatDateICS(date: Date): string {
        return `${date.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;
    }

}
