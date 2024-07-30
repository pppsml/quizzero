import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config'
import * as session from 'express-session'
import { graphqlUploadExpress } from 'graphql-upload-ts'

import { AppModule } from './app.module';
import { ConfigServiceVariables } from './config/configService.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<ConfigServiceVariables>);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({
    origin: true,
    methods: '*',
    credentials: true,
  })
  
  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: true,
        httpOnly: true,
        // maxAge: 1000 * 60, // 1 min
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
      // store: new PrismaSessionStore(prisma, {
      //   checkPeriod: 1000 * 60 * 5, // 5 mins
      //   dbRecordIdIsSessionId: true,
      //   dbRecordIdFunction: undefined,
      // }),
    }),
  );

  app.use('/api/graphql', graphqlUploadExpress({
    maxFileSize: 10000000,
    maxFiles: 10,
    overrideSendResponse: false,
  }))


  const PORT = configService.get('PORT') || 5000

  await app.listen(PORT);
}
bootstrap();
