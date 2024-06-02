import { Controller, Get, Logger } from '@nestjs/common'
// biome-ignore lint/style/useImportType: <explanation>
import {
    HealthCheckService,
    HttpHealthIndicator,
    HealthCheck,
} from '@nestjs/terminus'

@Controller('health')
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly http: HttpHealthIndicator,
        private readonly loggerService: Logger
    ) {}

    @Get()
    @HealthCheck()
    check() {
        this.loggerService.error('Health check', 'HealthController')
        return this.health.check([
            () => this.http.pingCheck('google', 'https://google.com'),
        ])
    }
}
