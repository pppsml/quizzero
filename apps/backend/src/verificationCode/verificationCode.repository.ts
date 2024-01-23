import { Injectable } from "@nestjs/common";
import { User, VerificationCode, PrismaPromise } from "@repo/database/dist";

import { PrismaService } from "src/prisma/prisma.service";


interface VerificationCodeRepositoryInterface {
  createOne: (userId: User['id']) => Promise<VerificationCode>

  findOneByUserId: (userId: User['id']) => Promise<VerificationCode>

  deleteOneById: (id: VerificationCode['id']) => Promise<boolean>

  // deleteOne: ()
};

export const VerificationCodeRepositorySymbol = Symbol();

@Injectable()
export class PrismaVerificationCodeRepository implements VerificationCodeRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {};

  async createOne(userId: User['id']) {
    const verificationCode = await this.prismaService.verificationCode.create({ data: { userId } })

    return verificationCode
  };

  async findOneByUserId(userId: string) {
    return await this.prismaService.verificationCode.findFirst({
      where: {
        userId,
      },
    })
  };

  async deleteOneById(id: VerificationCode['id']): Promise<boolean> {
    try {
      await this.prismaService.verificationCode.delete({
        where: {
          id,
        }
      })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
};