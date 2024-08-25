import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'
import { PrismaService } from '@/prisma.service'
import { PriceCategory } from '@prisma/client'

@Injectable()
export class RestaurantService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createRestaurantDto: CreateRestaurantDto) {
        // check if the n_siret is already used
        const siretExist = await this.prisma.restaurant.findFirst({
            where: {
                n_siret: createRestaurantDto.n_siret,
            },
        })

        if (siretExist) {
            throw new ConflictException('Siret already used')
        }

        return this.prisma.restaurant.create({
            data: {
                ...createRestaurantDto,
                features: {
                    connect: createRestaurantDto.features.map((feature) => ({
                        id: feature,
                    })),
                },
                favorites: {
                    connect: createRestaurantDto.favorites.map((favorite) => ({
                        id: favorite,
                    })),
                },
                reservations: {
                    connect: createRestaurantDto.reservations.map(
                        (reservation) => ({
                            id: reservation,
                        })
                    ),
                },
                price: createRestaurantDto.price as PriceCategory,
            },
        })
    }

    async findAll() {
        return this.prisma.restaurant.findMany()
    }

    async findOne(id: string) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id },
        })

        if (!restaurant) {
            throw new NotFoundException('Restaurant not found')
        }

        return restaurant
    }

    async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id },
        })

        if (!restaurant) {
            throw new NotFoundException('Restaurant not found')
        }

        return this.prisma.restaurant.update({
            where: { id },
            data: {
                ...updateRestaurantDto,
                features: {
                    connect: updateRestaurantDto.features?.map((feature) => ({
                        id: feature,
                    })),
                },
                favorites: {
                    connect: updateRestaurantDto.favorites?.map((favorite) => ({
                        id: favorite,
                    })),
                },
                reservations: {
                    connect: updateRestaurantDto.reservations?.map(
                        (reservation) => ({
                            id: reservation,
                        })
                    ),
                },
                price: updateRestaurantDto.price as PriceCategory,
            },
        })
    }

    async remove(id: string) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id },
        })

        if (!restaurant) {
            throw new NotFoundException('Restaurant not found')
        }

        return this.prisma.restaurant.delete({
            where: { id },
        })
    }
}
