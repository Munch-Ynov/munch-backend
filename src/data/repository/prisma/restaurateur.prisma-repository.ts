import { Injectable } from '@nestjs/common'
import type { RestaurateurProfile as PrismaRestaurateurProfile } from '@prisma/client'
import { RestaurateurMapper } from 'src/data/mapper/prisma'
import type { RestaurateurProfile } from 'src/data/models'
import type { RestaurateurRepository } from '..'
import { PrismaRepository } from './base.prisma-repository'
// biome-ignore lint/style/useImportType: <explanation>
import { PrismaService } from './service/prisma.service'

@Injectable()
export class RestaurateurPrismaRepository
    extends PrismaRepository<RestaurateurProfile, PrismaRestaurateurProfile>
    implements RestaurateurRepository
{
    constructor(private prisma: PrismaService) {
        super(prisma.restaurateurProfile, RestaurateurMapper)
    }
}
