import { Module } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

import { UserModule } from './user/user.module';
import { IContext } from './types/context';
import { QuizModule } from './quiz/quiz.module';
// import { UserActiveSessionModule } from './userActiveSession/userActiveSession.module';
import { ConfigServiceVariables } from './config/configService.config';

console.log(process.cwd() + '/templates/');
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.development.local`,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService<ConfigServiceVariables>) => {
        return {
          uri: configService.get('MONGODB_URI')
        }
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      autoSchemaFile: true,
      context: async ({ req, res }: { req: Request; res: Response }) =>
        ({
          req,
          res,
          user: req.session.user || null,
        }) as IContext,
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<ConfigServiceVariables>) => ({
        transport: {
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
          dir: join(__dirname, '/mailer/templates/'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      })
    }),
    UserModule,
    QuizModule,
    // UserActiveSessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
