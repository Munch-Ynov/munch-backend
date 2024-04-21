import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Module({
    providers: [SeederService],
    exports: [],
    controllers: [],
    imports: []
})
export class SeederModule {}
