import { Injectable } from '@nestjs/common';
import { MailerService as NodemailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailerService {
  constructor(private readonly mailer: NodemailerService) {
    this.baseSubject = 'Quizzero: ';
  }

  private readonly baseSubject: string;

  async sendConfirmationMail(email: string, code: string): Promise<boolean> {
    try {
      this.mailer.sendMail({
        to: email,
        subject: this.baseSubject + 'Подтверждение почты',
        template: 'confirm-email',
        context: {
          code
        },
        
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
