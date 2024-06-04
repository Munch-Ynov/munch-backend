import { Category } from '@/data/models/category.model'
import { Repository } from './base.repository'

abstract class CategoryRepository extends Repository<Category> {
    abstract findByName(name: string): Promise<Category>
}

export { CategoryRepository }
