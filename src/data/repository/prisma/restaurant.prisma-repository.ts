import type { Restaurant } from 'src/data/models'
import type { RestaurantRepository } from '..'
import { PrismaRepository } from './base.prisma-repository'
import { Injectable } from '@nestjs/common'
import type { Restaurant as PrismaRestaurant } from '@prisma/client'
import { RestaurantMapper } from 'src/data/mapper/prisma'
// biome-ignore lint/style/useImportType: <explanation>
import { PrismaService } from './service/prisma.service'

@Injectable()
export class RestaurantPrismaRepository
    extends PrismaRepository<Restaurant, PrismaRestaurant>
    implements RestaurantRepository
{
    constructor(private prisma: PrismaService) {
        super(prisma.restaurant, RestaurantMapper)
    }
}
