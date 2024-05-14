import { RestaurateurProfile } from 'src/data/models/restaurateur-profile'
import { Repository } from './base.repository'

abstract class RestaurateurRepository extends Repository<RestaurateurProfile> { }

export { RestaurateurRepository }
