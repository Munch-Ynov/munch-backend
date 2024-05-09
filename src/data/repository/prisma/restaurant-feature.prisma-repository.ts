import type { RestaurantFeature } from 'src/data/models'
import type { RestaurantFeatureRepository } from '..'
import { PrismaRepository } from './base.prisma-repository'
import type { RestaurantFeature as PrismaRestaurantFeature } from '@prisma/client'
import { RestaurantFeatureMapper } from 'src/data/mapper/prisma'
// biome-ignore lint/style/useImportType: <explanation>
import { PrismaService } from './service/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RestaurantFeaturePrismaRepository
    extends PrismaRepository<RestaurantFeature, PrismaRestaurantFeature>
    implements RestaurantFeatureRepository
{
    constructor(private prisma: PrismaService) {
        super(prisma.restaurantFeature, RestaurantFeatureMapper)
    }
}
