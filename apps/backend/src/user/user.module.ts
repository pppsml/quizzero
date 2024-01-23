import { Module } from "@nestjs/common";

import { UserResolver } from './user.resolver';
import { UserService } from "./user.service";

import { MailerModule } from "src/mailer/mailer.module";
import { VerificationCodeModule } from "src/verificationCode/verificationCode.module";

import { PrismaUserRepository, UserRepositorySymbol } from "./user.repository";

@Module({
  imports: [MailerModule, VerificationCodeModule],
  providers: [
    UserResolver,
    UserService,
    {
      provide: UserRepositorySymbol,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserModule {}