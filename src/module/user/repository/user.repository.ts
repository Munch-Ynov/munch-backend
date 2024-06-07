import { UserProfile } from '@/data/models/user-profile.model'
import { Repository } from '../../../data/repository/base.repository'

abstract class UserRepository extends Repository<UserProfile> { }

export { UserRepository }
