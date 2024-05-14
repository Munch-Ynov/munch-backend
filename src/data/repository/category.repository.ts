import { Category } from 'src/data/models/category.model'
import { Repository } from './base.repository'

abstract class CategoryRepository extends Repository<Category> {
    abstract findByName(name: string): Promise<Category>
}

export { CategoryRepository }
