import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const microservicesOptions: MicroserviceOptions = {
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:5672'],
    queue: 'account_service_queue',
  }
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microservicesOptions,
  );
  await app.listen();
}
bootstrap();
