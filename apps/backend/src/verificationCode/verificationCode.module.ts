import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose'


import { VerificationCodeService } from "./verificationCode.service";
import { VerificationCode, VerificationCodeSchema } from './verificationCode.schema'
import { VerificationCodeResolver } from "./verificationCode.resolver";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VerificationCode.name, schema: VerificationCodeSchema }])
  ],
  providers: [
    VerificationCodeResolver,
    VerificationCodeService,
  ],
  exports: [VerificationCodeService],
})
export class VerificationCodeModule {}