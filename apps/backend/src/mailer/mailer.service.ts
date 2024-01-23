import { Injectable } from '@nestjs/common';
import { MailerService as NestjsNodemailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailerService {
  constructor(private readonly mailer: NestjsNodemailerService) {
    this.baseSubject = 'Quizzero: ';
  }

  private readonly baseSubject: string;

  async sendConfirmationMail({ email, url }: { email: string, url: string }): Promise<boolean> {
    try {
      this.mailer.sendMail({
        to: email,
        subject: this.baseSubject + 'Подтверждение почты',
        template: 'confirm-email',
        context: {
          email,
          url,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
