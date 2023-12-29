import { Inject, Injectable } from '@nestjs/common';
import { User } from '@repo/database';

import { PrismaUserRepository, UserRepositorySymbol } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositorySymbol) private readonly userRepository: PrismaUserRepository,
  ) {}

  async getUserById(id: User['id']): Promise<User> {
    return await this.userRepository.getById(id)
  }
}
