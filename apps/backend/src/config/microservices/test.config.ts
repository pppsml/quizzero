import { ClientsModule, Transport } from '@nestjs/microservices'

export const microservice = ClientsModule.register([
  {
    name: 'TEST_MODULE',
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 5001,
    },
  }
])