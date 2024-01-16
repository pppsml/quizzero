import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'

import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const prisma = app.get(PrismaService)

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
        maxAge: 1000 * 60 * 1, // 1 min
        // maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
      store: new PrismaSessionStore(prisma, {
        checkPeriod: 1000 * 60 * 5, // 5 mins
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
  );


  const PORT = configService.get('PORT') || 5000

  await app.listen(PORT);
}
bootstrap();
