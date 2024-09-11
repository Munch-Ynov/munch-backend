import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailingServiceImpl } from '@/config/mailing/mailing.service.impl';
import { MailingController } from './mailing.controller';

@Module({
    providers: [
        {
            provide: MailingService,
            useClass: MailingServiceImpl
        }
    ],
    controllers: [
        MailingController
    ],
    exports: [MailingService]
})
export class MailingModule {}
