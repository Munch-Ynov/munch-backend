import { Module } from '@nestjs/common'

import { PrismaService } from '@/prisma.service'
import { FavoriteController } from './controller/favorite.controller'
import { FavoriteService } from './service/favorite.service'

@Module({
  controllers: [FavoriteController],
  providers: [
    FavoriteService,
    PrismaService,
  ],
})
export class FavoriteModule { }
