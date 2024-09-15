import { PrismaService } from '@/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class KpiService {
    constructor(private readonly prisma: PrismaService) {}

    async getKpiByUser(id: string) {
        // return the past 3 reservations of user
        const lastReservations = await this.prisma.reservation.findMany({
            where: {
                userId: id,
                date: {
                    lte: new Date(),
                },
            },
            include: {
                restaurant: {
                    select: {
                        name: true,
                    },
                },
            },
            take: 3,
        })

        // return next reservations of user
        const futureReservations = await this.prisma.reservation.findMany({
            where: {
                userId: id,
                date: {
                    gte: new Date(),
                },
            },
            include: {
                restaurant: {
                    select: {
                        name: true,
                    },
                },
            },
        })

        // recent favorite restaurants of user
        const favoriteRestaurants = await this.prisma.favorite.findMany({
            where: {
                userId: id,
                createdAt: {
                    gte: new Date(
                        new Date().setDate(new Date().getDate() - 30)
                    ),
                },
            },
            include: {
                restaurant: true,
            },
        })

        // return number of reservations
        const numberOfReservations = await this.prisma.reservation.count({
            where: {
                userId: id,
            },
        })

        // return number of favorite restaurants
        const numberOfFavoriteRestaurants = await this.prisma.favorite.count({
            where: {
                userId: id,
            },
        })

        // return number of distinct restaurants where user has made a reservation
        const distinctRestaurants = await this.prisma.reservation.findMany({
            where: {
                userId: id,
            },
            distinct: ['restaurantId'],
        })

        return {
            lastReservations,
            futureReservations,
            favoriteRestaurants,
            numberOfReservations,
            numberOfFavoriteRestaurants,
            distinctRestaurants: distinctRestaurants.length,
        }
    }
}
