import type { RestaurantFeature as PrismaRestaurantFeature } from '@prisma/client'
import type { RestaurantFeature } from 'src/data/models'
import { Mapper } from '../base.mapper'

class RestaurantFeatureMapper extends Mapper<
    RestaurantFeature,
    PrismaRestaurantFeature
> {
    $toEntity(restaurantFeature) {
        return {
            ...restaurantFeature,
        }
    }

    $toData(restaurantFeature) {
        return {
            ...restaurantFeature,
            icon: restaurantFeature.icon,
        }
    }
}

export { RestaurantFeatureMapper }
