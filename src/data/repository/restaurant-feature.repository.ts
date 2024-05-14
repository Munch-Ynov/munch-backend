import { RestaurantFeature } from 'src/data/models/restaurant-feature.model'
import { Repository } from './base.repository'

abstract class RestaurantFeatureRepository extends Repository<RestaurantFeature> { }

export { RestaurantFeatureRepository }
