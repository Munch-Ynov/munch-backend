
export interface MailData {
    from: string
    to: string
    subject: string
    text: string
}

abstract class MailingService {
  constructor() {}

  /**
   * Send via API
   *
   * @param data
   */
  abstract sendMail(data: MailData): Promise<void>;
}

export { MailingService };