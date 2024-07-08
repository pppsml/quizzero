import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { MicroserviceController } from "./microservice.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        transport: Transport.TCP,
        name: 'TEST_MICROSERVICE',
        options: {
          host: 'localhost',
          port: 5001,
        }
      },
    ])
  ],
  controllers: [MicroserviceController],
})
export class MicroserviceModule {}