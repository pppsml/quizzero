import { Module } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { IContext } from './types/context';
import { QuizModule } from './quiz/quiz.module';
import { join } from 'path';

console.log(process.cwd() + '/templates/')
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.development.local`,
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      buildSchemaOptions: {
        dateScalarMode: 'isoDate',
      },
      autoSchemaFile: true,
      context: async ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
        user: req.session.user || null,
      } as IContext),
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.NODEMAILER_TRANSPORT_HOST,
        port: Number(process.env.NODEMAILER_TRANSPORT_PORT),
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }
      },
      defaults: {
        from: `${process.env.NODEMAILER_NAME} <${process.env.NODEMAILER_EMAIL}>`,
      },
      template: {
        dir: join(__dirname, '/mailer/templates/'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        }
      },
    }),
    PrismaModule,
    UserModule,
    QuizModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
