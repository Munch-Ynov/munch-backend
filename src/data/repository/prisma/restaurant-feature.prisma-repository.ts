import { RestaurantFeature } from '@/data/models/restaurant-feature.model'
import { PrismaRepository } from './base.prisma-repository'
import { RestaurantFeature as PrismaRestaurantFeature } from '@prisma/client'
import { RestaurantFeatureMapper } from '@/data/mapper/prisma/restaurant-feature.mapper'
// biome-ignore lint/style/useImportType: <explanation>
import { PrismaService } from './service/prisma.service'
import { Injectable } from '@nestjs/common'
import { RestaurantFeatureRepository } from '../restaurant-feature.repository'

@Injectable()
export class RestaurantFeaturePrismaRepository
    extends PrismaRepository<RestaurantFeature, PrismaRestaurantFeature>
    implements RestaurantFeatureRepository {
    constructor(private prisma: PrismaService) {
        super(prisma.restaurantFeature, new RestaurantFeatureMapper())
    }
}
