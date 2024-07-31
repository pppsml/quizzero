import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config'
import * as session from 'express-session'
import { graphqlUploadExpress } from 'graphql-upload-ts'

import { AppModule } from './app.module';
import { ConfigServiceVariables } from './config/configService.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService<ConfigServiceVariables>);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe())
  app.useStaticAssets(
    join(__dirname, '../files'),
    {
      prefix: '/api/files/'
    },
  )

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
