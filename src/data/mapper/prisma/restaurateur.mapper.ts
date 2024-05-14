import { RestaurateurProfile as PrismaRestaurateurProfile } from '@prisma/client'
import { Mapper } from '../base.mapper'
import { RestaurateurProfile } from 'src/data/models/restaurateur-profile'

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
