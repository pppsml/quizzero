import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { MicroserviceController } from "./microservice.controller";

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
      },
    ])
  ],
  controllers: [MicroserviceController],
})
export class MicroserviceModule {}