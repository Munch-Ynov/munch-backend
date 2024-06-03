import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { SanitizerGuard } from './util/sanitizer.guard'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { WinstonModule } from 'nest-winston'
import { format, transports } from 'winston'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: WinstonModule.createLogger({
            transports: [
                // let's log errors into its own file
                   new transports.File({
                     filename: `logs/error.log`,
                     level: 'error',
                     format: format.combine(format.timestamp(), format.json()),
                   }),

                   new transports.File({
                        filename: `logs/warn.log`,
                        level: 'warn',
                        format: format.combine(format.timestamp(), format.json()),
                    }),

                     // info file will contains all logs
                     new transports.File({
                          filename: `logs/info.log`,
                          level: 'info',
                          format: format.combine(format.timestamp(), format.json()),
                        }),

                        

                   // logging all level
                   new transports.File({
                     filename: `logs/combined.log`,
                     format: format.combine(format.timestamp(), format.json()),
                   }),
                   // we also want to see logs in our console
                   new transports.Console({
                    format: format.combine(
                      format.cli(),
                      format.splat(),
                      format.timestamp(),
                      format.printf((info) => {
                        return `${info.timestamp} ${info.level}: ${info.message}`;
                      }),
                     ),
                 }),
                 ],
        })
    })
    app.enableCors({ origin: '*' })
    app.use(cookieParser())
    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    app.useGlobalGuards(new SanitizerGuard())

    app.use(helmet())

    const swagger_config = new DocumentBuilder()
        .setTitle('munchAPI')
        .setDescription(
            'munchAPI est une API pour permettre la gestion des reservations de restaurants.'
        )
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
