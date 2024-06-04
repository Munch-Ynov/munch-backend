import { Restaurant } from '@/data/models/restaurant.model'
import { Repository } from './base.repository'

abstract class RestaurantRepository extends Repository<Restaurant> { }

export { RestaurantRepository }
