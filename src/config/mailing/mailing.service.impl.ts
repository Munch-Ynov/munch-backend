import { Injectable, Logger } from "@nestjs/common";
import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import { MailingService } from "@/module/mailing/mailing.service";

@Injectable()
export class MailingServiceImpl implements MailingService {

  private enable = process.env.MAILGUN_ENABLED !== 'false';

  private MAILGUN_KEY = process.env.MAILGUN_KEY || '';
  private MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || '';

  private client = new Mailgun(FormData).client({
    username: 'api',
    key: this.MAILGUN_KEY,
  });
  /**
 * Send via API
 *
 * @param data
 */
  async sendMail(data): Promise<void> {
    if (!this.enable) {
      Logger.log('Mailgun is disabled');
      return;
    }
    this.client.messages
      .create(this.MAILGUN_DOMAIN, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
