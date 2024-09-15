// import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser'
import { ErrorHandlerMiddleware } from '@nest-middlewares/errorhandler'
import { HelmetMiddleware } from '@nest-middlewares/helmet'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter'
import { TransformInterceptor } from './exception/exception.interceptior'
import { AuthModule } from './module/auth/auth.module'
import { HealthModule } from './module/health/health.module'
import { ReservationModule } from './module/reservation/reservation.module'
import { PrismaService } from './prisma.service'
import { ProfileModule } from './module/auth/roles/profile.module'
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser'
import { MailingModule } from './module/mailing/mailing.module'
import { FeaturesModule } from './module/features/features.module'
import { RestaurantModule } from './module/restaurant/restaurant.module'
import { FavoriteController } from './module/favorite/controller/favorite.controller'
import { FavoriteModule } from './module/favorite/favorite.module'
import { KpiModule } from './module/kpi/kpi.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        RateLimiterModule,
        HealthModule,
        AuthModule,
        ReservationModule,
        ProfileModule,
        MailingModule,
        FeaturesModule,
        RestaurantModule,
        FavoriteModule,
        KpiModule,
    ],
    controllers: [],
    providers: [
        PrismaService,
        {
            provide: APP_GUARD,
            useClass: RateLimiterGuard,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
    ],
})
export class AppModule {
    configure(consumer: import('@nestjs/common').MiddlewareConsumer) {
        ErrorHandlerMiddleware.configure({
            log: false,
        })
        // consumer.apply(ErrorHandlerMiddleware).forRoutes('*')
        HelmetMiddleware.configure({})
        consumer.apply(HelmetMiddleware).forRoutes('*')
        CookieParserMiddleware.configure('MySecret')
        consumer.apply(CookieParserMiddleware).forRoutes('*')
        // ErrorHandlerMiddleware.configure({
        //     log: false,
        // })
        // consumer.apply(ErrorHandlerMiddleware).forRoutes('*')
    }
}
