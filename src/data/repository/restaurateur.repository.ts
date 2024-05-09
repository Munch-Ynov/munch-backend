import type { RestaurateurProfile } from 'src/data/models'
import { Repository } from './base.repository'

abstract class RestaurateurRepository extends Repository<RestaurateurProfile> {}

export { RestaurateurRepository }
