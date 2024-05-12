import type { Favorite as PrismaFavorite } from '@prisma/client'
import type { Favorite } from 'src/data/models'
import { Mapper } from '../base.mapper'

class FavoriteMapper extends Mapper<Favorite, PrismaFavorite> {
    $toEntity(favorite) {
        return {
            ...favorite,
        }
    }

    $toData(favorite) {
        return {
            ...favorite,
        }
    }
}

export { FavoriteMapper }
