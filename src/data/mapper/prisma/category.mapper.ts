import type { Category as PrismaCategory } from '@prisma/client'
import type { Category } from 'src/data/models'
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
