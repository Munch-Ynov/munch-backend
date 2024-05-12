import type { Category as PrismaCategory } from '@prisma/client'
import type { Category } from 'src/data/models'
import { Mapper } from '../base.mapper'

class CategoryMapper extends Mapper<Category, PrismaCategory> {
    $toEntity(category) {
        return {
            ...category,
        }
    }

    $toData(category) {
        return {
            ...category,
        }
    }
}

export { CategoryMapper }
