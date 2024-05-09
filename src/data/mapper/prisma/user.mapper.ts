import type { UserProfile as PrismaUserProfile } from '@prisma/client'
import type { UserProfile } from 'src/data/models'
import type { Mapper } from '../base.mapper'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
const UserMapper: Mapper<UserProfile, PrismaUserProfile> = class {
    static toEntity(userProfile: PrismaUserProfile): UserProfile {
        return {
            ...userProfile,
        }
    }

    static toData(userProfile: UserProfile): PrismaUserProfile {
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
