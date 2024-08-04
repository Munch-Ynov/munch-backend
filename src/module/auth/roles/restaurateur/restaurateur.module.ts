
import { RestaurateurServiceImpl } from '@/config/auth/roles/restaurateur/restaurateur.service.impl';
import { Module } from '@nestjs/common';
import { RestaurateurService } from './restaurateur.service';

@Module({
    imports: [],
    providers: [
        {
            provide: RestaurateurService,
            useClass: RestaurateurServiceImpl,
        },
    ],
    exports: [RestaurateurService],
})
export class RestaurateurModule {}


