import { Inject, Injectable } from "@nestjs/common";
import { User, VerificationCode } from "@repo/database";

import { PrismaVerificationCodeRepository, VerificationCodeRepositorySymbol } from "./verificationCode.repository";

@Injectable()
export class VerificationCodeService {
  constructor(
    @Inject(VerificationCodeRepositorySymbol)
    private readonly verificationCodeRepository: PrismaVerificationCodeRepository,
  ) {}

  async createOne(userId: User['id']): Promise<VerificationCode> {
    return await this.verificationCodeRepository.createOne(userId)
  }

  async findOneByUserId(
    userId: User['id'],
  ): Promise<VerificationCode> {
    return await this.verificationCodeRepository.findOneByUserId(userId)
  }

  async deleteOneById(id: VerificationCode['id']): Promise<boolean> {
    return await this.verificationCodeRepository.deleteOneById(id)
  }
}