import { ConfigService } from "@nestjs/config";
import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

import { ConfigServiceVariables } from "./configService.config";
import { join } from "path";

export const getMailerConfig = (): MailerAsyncOptions => ({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService<ConfigServiceVariables>) => ({
    transport: {
      tls: {
        rejectUnauthorized: false
      },
      host: configService.get('NODEMAILER_TRANSPORT_HOST'),
      port: Number(configService.get('NODEMAILER_TRANSPORT_PORT')),
      auth: {
        user: configService.get('NODEMAILER_EMAIL'),
        pass: configService.get('NODEMAILER_PASSWORD'),
        clientId: configService.get('GOOGLE_CLIENT_ID'),
        clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      },
    },
    defaults: {
      from: `${configService.get('NODEMAILER_NAME')} <${configService.get('NODEMAILER_EMAIL')}>`,
    },
    template: {
      dir: join(__dirname, '../mailer/templates/'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  })
})