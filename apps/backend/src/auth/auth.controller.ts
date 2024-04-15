import { Controller, Get, Param, Query } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { ConfigServiceVariables } from "src/config";
import { ProvidersService } from "./providers/provides.service";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService<ConfigServiceVariables>,
    private readonly providersService: ProvidersService,
  ) {}

  @Get('callback/:provider')
  async providerCallback(
    @Query('code') code: string,
    @Param('provider') provider: string, 
  ) {
    return this.providersService.findService(provider).getUserByCode(code)
  }
}