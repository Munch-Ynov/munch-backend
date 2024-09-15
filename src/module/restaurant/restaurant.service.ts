import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'
import { PrismaService } from '@/prisma.service'
import { PriceCategory, Prisma, Restaurant } from '@prisma/client'
import { Pageable } from '@/data/util'
import { PaginationRequest } from '../../data/util/pageable'

@Injectable()
export class RestaurantService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createRestaurantDto: CreateRestaurantDto) {
        // check if the n_siret is already used
        const siretExist = await this.prisma.restaurant.findFirst({
            where: {
                n_siret: createRestaurantDto.n_siret,
            },
        })

        const {
            features,
            restaurateurId,
            price,
            ...dto } = createRestaurantDto

        return this.prisma.restaurant.create({
            data: {
                ...dto,
                RestaurateurProfile: {
                    connect: {
                        id: restaurateurId,
                    },
                },
                features: {
                    connect: features?.map((feature) => ({
                        id: feature,
                    })),
                },
                price: price as PriceCategory,
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            } as any,
        })
    }

    async findAll(
        request?: PaginationRequest<Restaurant, Prisma.RestaurantWhereInput>
    ): Promise<Pageable<Restaurant>> {
        const count = await this.prisma.restaurant.count({
            where: request?.filter,
        })

        return this.prisma.restaurant
            .findMany({
                skip: request?.page * request?.size,
                take: request?.size,
                orderBy: request?.sort.getSort(),
                where: request?.filter,
            })
            .then((restaurants) => {
                return Pageable.of({
                    content: restaurants,
                    totalElements: count,
                    request,
                })
            })
    }

    async findAllByOwner(ownerId: string) {
        return this.prisma.restaurant.findFirst({
            where: {
                restaurateurProfileId: ownerId,
            },
            include: {
                features: true,
            },
        })
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
                    connect: updateRestaurantDto.features?.map((featureId) => ({
                        id: featureId,
                    })),
                },
                favorites: {
                    connect: updateRestaurantDto.favorites?.map(
                        (favoriteId) => ({
                            id: favoriteId,
                        })
                    ),
                },
                reservations: {
                    connect: updateRestaurantDto.reservations?.map(
                        (reservationId) => ({
                            id: reservationId,
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
