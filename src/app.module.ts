import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HelmetMiddleware } from '@nest-middlewares/helmet'
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser'
import { ErrorHandlerMiddleware } from '@nest-middlewares/errorhandler'
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { HealthModule } from './module/health/health.module'
import { AuthModule } from './auth/auth.module'
import { ReservationModule } from './module/reservation/reservation.module'
import { RepositoryModule } from './data/repository'
import { SeederService } from './data/seeder/seeder.service'
import { UniformErrorFilter } from './config/errorsImplementations/uniform-error.filter'
import { Null404Interceptor } from './config/errorsImplementations/null-404.interceptor'

@Module({
    imports: [
        ConfigModule.forRoot(),
        RateLimiterModule,
        HealthModule,
        AuthModule,
        ReservationModule,
        {
            global: true,
            module: RepositoryModule,
        },
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RateLimiterGuard,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: Null404Interceptor,
        },
        {
            provide: APP_FILTER,
            useClass: UniformErrorFilter,
        },
        SeederService,
    ],
})
export class AppModule {
    configure(consumer: import('@nestjs/common').MiddlewareConsumer) {
        ErrorHandlerMiddleware.configure({
            log: false,
        })
        // consumer.apply(ErrorHandlerMiddleware).forRoutes("*");
        HelmetMiddleware.configure({})
        consumer.apply(HelmetMiddleware).forRoutes('*')
        CookieParserMiddleware.configure('MySecret')
        consumer.apply(CookieParserMiddleware).forRoutes('*')
        // ErrorHandlerMiddleware.configure({
        //   log: false,
        // });
        // consumer.apply(ErrorHandlerMiddleware).forRoutes("*");
    }
}
