<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
import { DatabaseModule } from "./data/database/database.module";
=======
=======
>>>>>>> Stashed changes
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { ErrorHandlerMiddleware } from '@nest-middlewares/errorhandler';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from './module/health/health.module';
import { AuthModule } from './auth/auth.module';
<<<<<<< Updated upstream
import { UserModule } from './user/user.module';
import { PasseportModule } from './passeport/passeport.module';
>>>>>>> Stashed changes
=======
import { DatabaseModule } from './data/database/database.module';
>>>>>>> Stashed changes

@Module({
  imports: [
    ConfigModule.forRoot(),
    RateLimiterModule,
    HealthModule,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
    AuthModule,
>>>>>>> Stashed changes
    DatabaseModule,
=======
    AuthModule,
    UserModule,
    PasseportModule,
>>>>>>> Stashed changes
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
    HelmetMiddleware.configure({});
    consumer.apply(HelmetMiddleware).forRoutes("*");
    CookieParserMiddleware.configure("MySecret");
    consumer.apply(CookieParserMiddleware).forRoutes("*");
    ErrorHandlerMiddleware.configure({
      log: false,
    });
    consumer.apply(ErrorHandlerMiddleware).forRoutes("*");
  }
}
