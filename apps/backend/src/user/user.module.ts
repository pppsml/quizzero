import { Module } from "@nestjs/common";

import { UserResolver } from './user.resolver';
import { UserService } from "./user.service";
import { PrismaUserRepository, UserRepositorySymbol } from "./user.repository";

@Module({
  providers: [
    UserResolver,
    UserService,
    {
      provide: UserRepositorySymbol,
      useClass: PrismaUserRepository
    }
  ],
})
export class UserModule {}