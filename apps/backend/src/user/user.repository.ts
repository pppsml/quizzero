import { Injectable } from '@nestjs/common';
import { User } from '@repo/database';

import { PrismaService } from 'src/prisma/prisma.service';

interface UserRepositoryInterface {
  getById: (id: User['id']) => Promise<User>;

  create: (data: Pick<User, 'email' | 'name' | 'password'>) => Promise<User>;
}

export const UserRepositorySymbol = Symbol();

@Injectable()
export class PrismaUserRepository implements UserRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(id: User['id']) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async create({ email, name, password }: Pick<User, 'email' | 'name' | 'password'>) {
    return await this.prismaService.user.create({
      data: {
        email,
        name,
        displayName: name || email,
        password,
      },
    });
  }
}
