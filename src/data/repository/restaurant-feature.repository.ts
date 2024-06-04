import { RestaurantFeature } from '@/data/models/restaurant-feature.model'
import { Repository } from './base.repository'

abstract class RestaurantFeatureRepository extends Repository<RestaurantFeature> { }

export { RestaurantFeatureRepository }
