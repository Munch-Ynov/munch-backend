import { UserProfile } from '@/data/models/user-profile.model'
import { Repository } from './base.repository'

abstract class UserRepository extends Repository<UserProfile> { }

export { UserRepository }
