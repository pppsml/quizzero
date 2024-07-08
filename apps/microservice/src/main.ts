import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const microserviceOptions: MicroserviceOptions = {
  options: {
    host: 'localhost',
    port: 5001,
  },
  transport: Transport.TCP
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule);
  await app.listen();
}
bootstrap();
