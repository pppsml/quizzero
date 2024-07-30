import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { MailerModule } from '@nestjs-modules/mailer';

import { AuthModule } from './auth/auth.module';
import { QuizModule } from './quiz/quiz.module';
import { FileModule } from './file/file.module';

import {
  getConfigModuleOptions,
  getGraphqlConfig,
  getMailerConfig,
  getMongooseConfig,
} from './config'

@Module({
  imports: [
    ConfigModule.forRoot(getConfigModuleOptions()),
    MongooseModule.forRootAsync(getMongooseConfig()),
    GraphQLModule.forRoot(getGraphqlConfig()),
    MailerModule.forRootAsync(getMailerConfig()),
    AuthModule,
    QuizModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
