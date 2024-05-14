import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser'
import { ErrorHandlerMiddleware } from '@nest-middlewares/errorhandler'
import { HelmetMiddleware } from '@nest-middlewares/helmet'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter'
import { TransformInterceptor } from './exception/exception.interceptior'
import { UniformErrorFilter } from './exception/uniform-error.filter'
import { AuthModule } from './module/auth/auth.module'
import { HealthModule } from './module/health/health.module'
import { ReservationModule } from './module/reservation/reservation.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        RateLimiterModule,
        HealthModule,
        AuthModule,
        ReservationModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RateLimiterGuard,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
        // {
        //     provide: APP_FILTER,
        //     useClass: UniformErrorFilter,
        // },
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
