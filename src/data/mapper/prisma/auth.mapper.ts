import type { Auth as PrismaAuth } from '@prisma/client'
import type { Auth } from 'src/data/models'
import { Mapper } from '../base.mapper'

class AuthMapper extends Mapper<Auth, PrismaAuth> {

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

export { AuthMapper }
