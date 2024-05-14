import { UserProfile as PrismaUserProfile } from '@prisma/client'
import { UserProfile } from 'src/data/models/user-profile.model'
import { Mapper } from '../base.mapper'

class UserMapper extends Mapper<UserProfile, PrismaUserProfile> {
    $toEntity(data) {
        const { ...entity } = data
        return {
            ...entity,
            authId: entity.id,
        }
    }

    $toData(entity) {
        const { authId, ...data } = entity
        return {
            ...data,
            avatar: data.avatar,
            banner: data.banner,
            phone: data.phone,
        }
    }
}

export { UserMapper }
