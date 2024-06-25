import { GoneException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { VerificationCodeTypes, CODE_LENGTH } from "@repo/types";

import { VerificationCode } from "./verificationCode.schema";
import { User } from "src/user/user.schema";
import { randomNumber } from 'src/utils/random'
import { VerifyCodeInput } from "./dto/verifyCode.dto";

@Injectable()
export class VerificationCodeService {
  private readonly ttl: number = 1000 * 60 * 15 // 15mins

  constructor(
    @InjectModel(VerificationCode.name)
    private readonly verificationCodeModel: Model<VerificationCode>
  ) {}

  private generateCode(length: number = CODE_LENGTH) {
    const symbols = [
      // [ from char code, count ]
      [ 48, 9 ], // numbers
      [ 65, 25 ], // uppercase letters
    ]

    let code: string = ''

    for (let i = 0; i < length; i++) {
      const [ fromCharCode, count ] = symbols[randomNumber(0, symbols.length - 1)],
            charCode = randomNumber(fromCharCode, fromCharCode + count),
            char = String.fromCharCode(charCode)

      code += char
    }

    return code
  }

  async createOne(email: User['email'], type: VerificationCodeTypes): Promise<VerificationCode> {  
    await this.verificationCodeModel.deleteMany({ email, type })
    
    const code = this.generateCode()
  
    return await this.verificationCodeModel.create({
      code,
      email,
      type,
    })
  }

  async verify({ code, email, type }: VerifyCodeInput) {
    const dbCode = await this.verificationCodeModel.findOne({ email, code, type })
    if (!dbCode) throw new UnauthorizedException('Uncorrect code')

    if (dbCode.createdAt.getTime() + this.ttl < Date.now()) {
      await dbCode.deleteOne()
      throw new GoneException("Code expired")
    }

    await dbCode.deleteOne()

    return true
  }
}