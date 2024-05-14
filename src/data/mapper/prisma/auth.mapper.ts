import { Auth as PrismaAuth } from '@prisma/client'
import { Mapper } from '../base.mapper'
import { Auth } from 'src/module/auth/model/auth.model'

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
