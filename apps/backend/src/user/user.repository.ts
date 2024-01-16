import { Injectable } from '@nestjs/common';
import { User } from '@repo/database'

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/createUser.input';
import { GqlUser } from './user.schema'

interface UserRepositoryInterface {
  findOneById: (id: User['id']) => Promise<GqlUser>;

  findOneByEmail: (email: User['email']) => Promise<GqlUser>;

  createOne: (data: CreateUserInput) => Promise<GqlUser>;

  updateOne: (id: User['id'], data: User) => Promise<GqlUser>
}

export const UserRepositorySymbol = Symbol();

@Injectable()
export class PrismaUserRepository implements UserRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneById(id: User['id']) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async findOneByEmail(email: User['email']) {
    return await this.prismaService.user.findUnique({ where: { email } })
  }

  async createOne({ email, name, password }: CreateUserInput) {
    return await this.prismaService.user.create({
      data: {
        email,
        name,
        displayName: name || email,
        password,
      },
    });
  }

  async updateOne(id: User['id'], data: Partial<User>) {
    return await this.prismaService.user.update({
      where: { id },
      data,
    })
  }
}
