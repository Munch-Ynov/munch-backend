import type { RestaurateurProfile as PrismaRestaurateurProfile } from '@prisma/client'
import type { RestaurateurProfile } from 'src/data/models'
import { Mapper } from '../base.mapper'

class RestaurateurMapper extends Mapper<
    RestaurateurProfile,
    PrismaRestaurateurProfile
> {
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
        }
    }
}

export { RestaurateurMapper }
