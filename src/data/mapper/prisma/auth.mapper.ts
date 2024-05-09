import type { Auth as PrismaAuth } from '@prisma/client'
import type { Auth } from 'src/data/models'
import type { Mapper } from '../base.mapper'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
const AuthMapper: Mapper<Auth, PrismaAuth> = class {
    static toEntity(auth: PrismaAuth): Auth {
        return {
            ...auth,
        }
    }

    static toData(auth: Auth): PrismaAuth {
        return {
            ...auth,
        }
    }
}

export { AuthMapper }
