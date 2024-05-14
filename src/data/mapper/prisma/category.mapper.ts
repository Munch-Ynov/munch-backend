import { Category as PrismaCategory } from '@prisma/client'
import { Category } from 'src/data/models/category.model'
import { Mapper } from '../base.mapper'

class CategoryMapper extends Mapper<Category, PrismaCategory> {
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

export { CategoryMapper }
