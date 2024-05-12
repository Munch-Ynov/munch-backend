import type { RestaurantFeature as PrismaRestaurantFeature } from '@prisma/client'
import type { RestaurantFeature } from 'src/data/models'
import { Mapper } from '../base.mapper'

class RestaurantFeatureMapper extends Mapper<
    RestaurantFeature,
    PrismaRestaurantFeature
> {
    $toEntity(data) {
        const { ...entity } = data
        return {
            ...entity,
        }
    }

    $toData(entity) {
        const { ...data } = entity
        return {
            ...data,
            icon: data.icon,
        }
    }
}

export { RestaurantFeatureMapper }
