import { UserMapper } from 'src/data/mapper/prisma'
import type { UserRepository } from '..'
import { PrismaRepository } from './base.prisma-repository'
import { Injectable } from '@nestjs/common'
import type { UserProfile as PrismaUserProfile } from '@prisma/client'
import type { UserProfile } from 'src/data/models'
// biome-ignore lint/style/useImportType: <explanation>
import { PrismaService } from './service/prisma.service'

@Injectable()
export class UserPrismaRepository
    extends PrismaRepository<UserProfile, PrismaUserProfile>
    implements UserRepository
{
    constructor(private prisma: PrismaService) {
        super(prisma.userProfile, UserMapper)
    }
}
