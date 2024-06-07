import { Module } from '@nestjs/common'
import { PrismaModule } from '@/data/repository/prisma/service/prisma.module'
import { UserPrismaRepository } from '../../data/repository/prisma/user.prisma-repository'
import { UserRepository } from './repository/user.repository'



@Module({
  imports: [
    PrismaModule
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [UserRepository]
})
export class UserModule { }
