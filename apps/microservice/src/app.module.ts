import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MicroserviceModule } from './microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
