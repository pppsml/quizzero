import { Module } from "@nestjs/common";

import { VerificationCodeService } from "./verificationCode.service";
import { PrismaVerificationCodeRepository, VerificationCodeRepositorySymbol } from "./verificationCode.repository";

@Module({
  providers: [
    VerificationCodeService,
    {
      provide: VerificationCodeRepositorySymbol,
      useClass: PrismaVerificationCodeRepository,
    }
  ],
  exports: [VerificationCodeService],
})
export class VerificationCodeModule {}