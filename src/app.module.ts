import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { HelmetMiddleware } from "@nest-middlewares/helmet";
import { CookieParserMiddleware } from "@nest-middlewares/cookie-parser";
import { ErrorHandlerMiddleware } from "@nest-middlewares/errorhandler";
import { RateLimiterGuard, RateLimiterModule } from "nestjs-rate-limiter";
import { APP_GUARD } from "@nestjs/core";
import { HealthModule } from "./module/health/health.module";
import { RepositoryModule } from './data/repository/repository.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RateLimiterModule,
    HealthModule,
    RepositoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
