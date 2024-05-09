import type { Category } from 'src/data/models'
import { Repository } from './base.repository'

abstract class CategoryRepository extends Repository<Category> {
    abstract findByName(name: string): Promise<Category>
}

export { CategoryRepository }
