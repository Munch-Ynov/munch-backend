import { UserMapper } from '@/data/mapper/prisma/user.mapper'
import { PrismaRepository } from './base.prisma-repository'
import { Injectable } from '@nestjs/common'
import { UserProfile as PrismaUserProfile } from '@prisma/client'
// biome-ignore lint/style/useImportType: <explanation>
import { PrismaService } from './service/prisma.service'
import { UserRepository } from '../user.repository'
import { UserProfile } from '@/data/models/user-profile.model'

@Injectable()
export class UserPrismaRepository
    extends PrismaRepository<UserProfile, PrismaUserProfile>
    implements UserRepository {
    constructor(private prisma: PrismaService) {
        super(prisma.userProfile, new UserMapper())
    }
}
