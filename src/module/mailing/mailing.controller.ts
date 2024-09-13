import {
    Body,
    Controller,
    HttpException,
    Logger,
    Post,
    UseGuards,
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiTags,
} from '@nestjs/swagger'
import { MailData, MailingService } from './mailing.service'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import { RolesGuard } from '@/guard/roles.guard'

@Controller('mailing')
@ApiTags('mailing', 'API')
export class MailingController {
    constructor(
        private readonly mailingService: MailingService,
    ) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Post('send')
    // @ApiOkResponse({ type: TokenDto })
    async send(
        @Body() { from, to, subject, text }: MailData
    ) {
        if (!from || !to || !subject || !text) {
            // http error
            throw new HttpException('All fields are required', 400)
        }

        try{
            await this.mailingService.sendMail({ from, to, subject, text })
            Logger.log('Mail sent successfully')
        } catch (e) {
            throw new HttpException('An error occured while sending the mail', 500)
        }
    }

}
