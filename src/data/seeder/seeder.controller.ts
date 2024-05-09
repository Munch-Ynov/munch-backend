import { Controller, Post } from '@nestjs/common'
import { SeederService } from './seeder.service'

@Controller('seeder')
export class SeederController {
    constructor(private readonly seed: SeederService) {}

    @Post()
    async seedAll() {
        await this.seed.seedAll()
    }
}
