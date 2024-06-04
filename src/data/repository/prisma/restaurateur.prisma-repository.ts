import { Injectable } from '@nestjs/common'
import { RestaurateurProfile as PrismaRestaurateurProfile } from '@prisma/client'
import { RestaurateurMapper } from '@/data/mapper/prisma/restaurateur.mapper'
import { RestaurateurProfile } from '@/data/models/restaurateur-profile'
import { PrismaRepository } from './base.prisma-repository'
// biome-ignore lint/style/useImportType: <explanation>
import { PrismaService } from './service/prisma.service'
import { RestaurateurRepository } from '../restaurateur.repository'

@Injectable()
export class RestaurateurPrismaRepository
    extends PrismaRepository<RestaurateurProfile, PrismaRestaurateurProfile>
    implements RestaurateurRepository {
    constructor(private prisma: PrismaService) {
        super(prisma.restaurateurProfile, new RestaurateurMapper())
    }
}
