import { PrismaRepository } from './base.prisma-repository'
// biome-ignore lint/style/useImportType: <explanation>
import { PrismaService } from './service/prisma.service'
import { Auth as PrismaAuth } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { AuthMapper } from '@/data/mapper/prisma/auth.mapper'
import { Auth } from '@/module/auth/model/auth.model'
import { AuthRepository } from '@/module/auth/auth.repository'

@Injectable()
export class AuthPrismaRepository
    extends PrismaRepository<Auth, PrismaAuth>
    implements AuthRepository {
    constructor(private prisma: PrismaService) {
        super(prisma.auth, new AuthMapper())
    }

    async findByEmail(email: string): Promise<Auth> {
        const auth = await this.prisma.auth.findFirst({ where: { email } })
        return this.$mapper.toEntity(auth)
    }
}
