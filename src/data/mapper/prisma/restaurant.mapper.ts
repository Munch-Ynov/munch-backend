import type { Restaurant as PrismaRestaurant } from '@prisma/client'
import type { Restaurant } from 'src/data/models'
import { Mapper } from '../base.mapper'

class RestaurantMapper extends Mapper<Restaurant, PrismaRestaurant> {
    $toEntity(restaurant) {
        return {
            ...restaurant,
        }
    }

    $toData(restaurant) {
        return {
            ...restaurant,
        }
    }
}

export { RestaurantMapper }
