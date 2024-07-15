import { Module } from '@nestjs/common'
import { PrismaModule } from '@/data/repository/prisma/service/prisma.module'
import { RestaurantPrismaRepository } from '../../data/repository/prisma/restaurant.prisma-repository'
import { RestaurantRepository } from './repository/restaurant.repository'



@Module({
  imports: [
    PrismaModule
  ],
  providers: [
    {
      provide: RestaurantRepository,
      useClass: RestaurantPrismaRepository,
    },
  ],
  exports: [RestaurantRepository]
})
export class RestaurantModule { }
