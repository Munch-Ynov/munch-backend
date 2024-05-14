import { Favorite as PrismaFavorite } from '@prisma/client'
import { Favorite } from 'src/data/models/favorite.model'
import { Mapper } from '../base.mapper'

class FavoriteMapper extends Mapper<Favorite, PrismaFavorite> {
    $toEntity(data) {
        const { ...entity } = data
        return {
            ...entity,
        }
    }

    $toData(entity) {
        const { ...data } = entity
        return {
            ...data,
        }
    }
}

export { FavoriteMapper }
