import { Inject, Injectable } from '@nestjs/common';
import { MailerService as NestjsNodemailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailerService {
  constructor(private readonly mailer: NestjsNodemailerService) {
    this.baseSubject = 'Quizzero: ';
  }

  private readonly baseSubject: string;

  async sendConfirmationMail(to: string): Promise<boolean> {
    try {
      this.mailer.sendMail({
        to,
        subject: this.baseSubject + 'Подтверждение почты',
        template: 'confirm-email',
        context: {
          email: to,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
