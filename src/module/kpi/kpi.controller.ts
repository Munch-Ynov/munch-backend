import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { KpiService } from './kpi.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'

@Controller('kpi')
@ApiTags('KPI')
export class KpiController {
    constructor(private readonly kpiService: KpiService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('user/:id')
    async getKpiByUser(@Param('id') id: string) {
        return this.kpiService.getKpiByUser(id)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('restaurant/:id')
    async getKpiByRestaurant(@Param('id') id: string) {
        return this.kpiService.getKpiByRestaurant(id)
    }
}
