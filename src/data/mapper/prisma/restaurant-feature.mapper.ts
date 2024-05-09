import type { RestaurantFeature as PrismaRestaurantFeature } from '@prisma/client'
import type { RestaurantFeature } from 'src/data/models'
import type { Mapper } from '../base.mapper'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
const RestaurantFeatureMapper: Mapper<
    RestaurantFeature,
    PrismaRestaurantFeature
> = class {
    static toEntity(
        restaurantFeature: PrismaRestaurantFeature
    ): RestaurantFeature {
        return {
            ...restaurantFeature,
        }
    }

    static toData(
        restaurantFeature: RestaurantFeature
    ): PrismaRestaurantFeature {
        return {
            ...restaurantFeature,
            icon: restaurantFeature.icon,
        }
    }
}

export { RestaurantFeatureMapper }
