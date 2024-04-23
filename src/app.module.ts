import { CookieParserMiddleware } from "@nest-middlewares/cookie-parser";
import { ErrorHandlerMiddleware } from "@nest-middlewares/errorhandler";
import { HelmetMiddleware } from "@nest-middlewares/helmet";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { RateLimiterGuard, RateLimiterModule } from "nestjs-rate-limiter";
import { RepositoryModule } from './data/repository/repository.module';
import { HealthModule } from "./module/health/health.module";
import { ReservationModule } from './reservation/reservation.module';
import { SeederModule } from "./data/seeder/seeder.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    RateLimiterModule,
    HealthModule,
    ReservationModule,
    {
      global: true,
      module: RepositoryModule,
    },
    SeederModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: import("@nestjs/common").MiddlewareConsumer) {
    ErrorHandlerMiddleware.configure({
      log: false,
    });
    // consumer.apply(ErrorHandlerMiddleware).forRoutes("*");
    HelmetMiddleware.configure({});
    consumer.apply(HelmetMiddleware).forRoutes("*");
    CookieParserMiddleware.configure("MySecret");
    consumer.apply(CookieParserMiddleware).forRoutes("*");
  }
}
