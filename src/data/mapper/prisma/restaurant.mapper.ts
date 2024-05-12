import type { Restaurant as PrismaRestaurant } from '@prisma/client'
import type { Restaurant } from 'src/data/models'
import { Mapper } from '../base.mapper'

class RestaurantMapper extends Mapper<Restaurant, PrismaRestaurant> {
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
        }
    }
}

export { RestaurantMapper }
