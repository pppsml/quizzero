import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { VerificationCode } from "./verificationCode.schema";
import { User } from "src/user/user.schema";
import { randomNumber } from 'src/utils/random'

@Injectable()
export class VerificationCodeService {
  constructor(
    @InjectModel(VerificationCode.name)
    private readonly verificationCodeModel: Model<VerificationCode>
  ) {}

  private generateCode(length: number = 8) {
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

  async createOne(email: User['email']): Promise<VerificationCode> {
    const code = this.generateCode()

    await this.verificationCodeModel.deleteMany({ email })
  
    return await this.verificationCodeModel.create({
      code,
      email,
    })
  }

  async verify(email: User['email'], code: VerificationCode['code']) {
    const dbCode = await this.verificationCodeModel.findOne({ email })
    if (!dbCode || dbCode.code !== code) throw new UnauthorizedException('Uncorrect code')

    await dbCode.deleteOne()

    return true
  }
}