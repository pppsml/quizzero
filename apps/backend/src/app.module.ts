import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { MailerModule } from '@nestjs-modules/mailer';

import { AuthModule } from './auth/auth.module';
import { MicroserviceModule } from './microservice/microservice.module';

import {
  getConfigModuleOptions,
  getGraphqlConfig,
  getMailerConfig,
  getMongooseConfig,
} from './config'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCOUNT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'account_service_queue',
        }
      }
    ]),
    MicroserviceModule,
    ConfigModule.forRoot(getConfigModuleOptions()),
    MongooseModule.forRootAsync(getMongooseConfig()),
    GraphQLModule.forRoot(getGraphqlConfig()),
    MailerModule.forRootAsync(getMailerConfig()),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
