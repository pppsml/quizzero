import { ClientsModule, Transport } from '@nestjs/microservices'

export const microservice = ClientsModule.register([
  {
    name: 'TEST_MICROSERVICE',
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 5001,
    },
  }
])