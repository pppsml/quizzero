import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { VerifyCodeInput } from "./dto/verifyCode.dto";
import { VerificationCodeService } from "./verificationCode.service";

@Resolver()
export class VerificationCodeResolver {
  constructor(private readonly verificationCodeService: VerificationCodeService) {}

  @Mutation(() => Boolean)
  async verifyCode(
    @Args('verifyCodeInput') input: VerifyCodeInput,
  ) {
      return this.verificationCodeService.verify(input)
  }
}