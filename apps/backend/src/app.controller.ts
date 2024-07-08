import { Controller, Get } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";

@Controller('app')
export class AppController {
  private client: ClientProxy

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 5001,
      }
    })
  }

  @Get('hello')
  getHelloFromMicroservice(): any {
    return this.client.send('getMicroserviceHello', 'getMicroserviceHello')
  }
}