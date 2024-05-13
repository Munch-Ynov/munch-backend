import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { SanitizerGuard } from './util/sanitizer.guard'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors({ origin: '*' })
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    app.useGlobalGuards(new SanitizerGuard());

    app.use(helmet());

    const swagger_config = new DocumentBuilder()
        .setTitle('munchAPI')
        .setDescription('munchAPI est une API pour permettre la gestion des reservations de restaurants.')
        .setVersion('1.0')
        .addTag('API')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, swagger_config)
    SwaggerModule.setup('api', app, document)

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        })
    )

    await app.listen(process.env.PORT || 3000)
}
bootstrap()
