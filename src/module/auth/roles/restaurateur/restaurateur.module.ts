import { RestaurateurServiceImpl } from '@/config/auth/roles/restaurateur/restaurateur.service.impl'
import { Module } from '@nestjs/common'
import { RestaurateurService } from './restaurateur.service'
import { PrismaService } from '@/prisma.service'

@Module({
    imports: [],
    providers: [
        {
            provide: RestaurateurService,
            useClass: RestaurateurServiceImpl,
        },
        PrismaService,
    ],
    exports: [RestaurateurService],
})
export class RestaurateurModule {}
