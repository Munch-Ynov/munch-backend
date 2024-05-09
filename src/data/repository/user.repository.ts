import type { UserProfile } from 'src/data/models'
import { Repository } from './base.repository'

abstract class UserRepository extends Repository<UserProfile> {}

export { UserRepository }
