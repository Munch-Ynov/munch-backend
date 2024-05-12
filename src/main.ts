import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors({ origin: '*' })
    app.useGlobalPipes(new ValidationPipe({ transform: true }))

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
