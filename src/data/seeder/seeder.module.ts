import { Module } from '@nestjs/common'
import { SeederService } from './seeder.service'
import { SeederController } from './seeder.controller'

@Module({
    imports: [],
    providers: [SeederService],
    controllers: [SeederController],
})
export class SeederModule {}
