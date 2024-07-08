import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class MicroserviceController {
  @MessagePattern('getMicroserviceHello')
  getHello() {
    return 'Hello from microservice'
  }
}