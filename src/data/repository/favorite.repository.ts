import { Favorite } from '@/data/models/favorite.model'
import { Repository } from './base.repository'

abstract class FavoriteRepository extends Repository<Favorite> {
    abstract findByUserId(userId: string): Promise<Favorite>
}

export { FavoriteRepository }
