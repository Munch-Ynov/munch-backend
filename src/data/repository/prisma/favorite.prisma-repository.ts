import { Favorite as PrismaFavorite } from '@prisma/client'
import { FavoriteMapper } from '@/data/mapper/prisma/favorite.mapper.ts'
import { Favorite } from '@/data/models/favorite.model'
import { PrismaRepository } from './base.prisma-repository'
// biome-ignore lint/style/useImportType: <explanation>
import { PrismaService } from './service/prisma.service'
import { Injectable } from '@nestjs/common'
import { FavoriteRepository } from '../favorite.repository'

@Injectable()
export class FavoritePrismaRepository
    extends PrismaRepository<Favorite, PrismaFavorite>
    implements FavoriteRepository {
    constructor(private prisma: PrismaService) {
        super(prisma.favorite, new FavoriteMapper())
    }

    async findByUserId(userId: string): Promise<Favorite> {
        const favorite = await this.prisma.favorite.findFirst({
            where: { userId },
        })
        return this.$mapper.toEntity(favorite)
    }
}
