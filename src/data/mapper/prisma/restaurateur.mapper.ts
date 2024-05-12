import type { RestaurateurProfile as PrismaRestaurateurProfile } from '@prisma/client'
import type { RestaurateurProfile } from 'src/data/models'
import { Mapper } from '../base.mapper'

class RestaurateurMapper extends Mapper<
    RestaurateurProfile,
    PrismaRestaurateurProfile
> {
    $toEntity(restaurateurProfile) {
        return {
            ...restaurateurProfile,
            authId: restaurateurProfile.id,
        }
    }

    $toData(restaurateurProfile) {
        return {
            ...restaurateurProfile,
            id: restaurateurProfile.authId,
            avatar: restaurateurProfile.avatar,
            banner: restaurateurProfile.banner,
            deletedAt: null,
        }
    }
}

export { RestaurateurMapper }
