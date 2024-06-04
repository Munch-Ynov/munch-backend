import { Restaurant } from '@/data/models/restaurant.model'
import { PrismaRepository } from './base.prisma-repository'
import { Injectable } from '@nestjs/common'
import { Restaurant as PrismaRestaurant } from '@prisma/client'
import { RestaurantMapper } from '@/data/mapper/prisma/restaurant.mapper'
// biome-ignore lint/style/useImportType: <explanation>
import { PrismaService } from './service/prisma.service'
import { RestaurantRepository } from '../restaurant.repository'

@Injectable()
export class RestaurantPrismaRepository
    extends PrismaRepository<Restaurant, PrismaRestaurant>
    implements RestaurantRepository {
    constructor(private prisma: PrismaService) {
        super(prisma.restaurant, new RestaurantMapper())
    }
}
