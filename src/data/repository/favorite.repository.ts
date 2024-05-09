import type { Favorite } from 'src/data/models'
import { Repository } from './base.repository'

abstract class FavoriteRepository extends Repository<Favorite> {
    abstract findByUserId(userId: string): Promise<Favorite>
}

export { FavoriteRepository }
