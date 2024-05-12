import type { UserProfile as PrismaUserProfile } from '@prisma/client'
import type { UserProfile } from 'src/data/models'
import { Mapper } from '../base.mapper'

class UserMapper extends Mapper<UserProfile, PrismaUserProfile> {
    $toEntity(userProfile) {
        return {
            ...userProfile,
        }
    }

    $toData(userProfile) {
        return {
            ...userProfile,
            id: userProfile.id,
            avatar: userProfile.avatar,
            banner: userProfile.banner,
            phone: userProfile.phone,
        }
    }
}

export { UserMapper }
