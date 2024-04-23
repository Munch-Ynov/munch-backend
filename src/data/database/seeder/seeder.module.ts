import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { DatabaseModule } from '../database.module';

@Module({
    providers: [SeederService],
    exports: [SeederService],
    controllers: [],
    imports: [DatabaseModule]
})
export class SeederModule {}
