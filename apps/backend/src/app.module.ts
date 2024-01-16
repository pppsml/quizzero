import { Module } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { IContext } from './types/context';
import { QuizModule } from './quiz/quiz.module';

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
    PrismaModule,
    UserModule,
    QuizModule,
  ],
  controllers: [],
})
export class AppModule {}
