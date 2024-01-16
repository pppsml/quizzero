import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import { User } from '@repo/database';

import { PrismaUserRepository, UserRepositorySymbol } from './user.repository';
import { CreateUserInput } from './dto/createUser.input';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly userRepository: PrismaUserRepository,
  ) {}

  private readonly saltRounds = 10;

  private getHash(data: string) {
    return hashSync(data, this.saltRounds);
  }

  async getUserById(id: User['id']): Promise<User> {
    return await this.userRepository.findOneById(id);
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.userRepository.findOneByEmail(
      createUserInput.email,
    );

    if (user)
      throw new ConflictException(
        `User with email "${createUserInput.email}" already exists`,
      );

    const hashedPass = this.getHash(createUserInput.password);

    createUserInput.password = hashedPass;

    return await this.userRepository.createOne(createUserInput);
  }

  async login(email: User['email'], password: User['password']) {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Uncorrect email');

    const passIsValid = compareSync(password, user.password);
    if (!passIsValid) throw new UnauthorizedException('Uncorrect password');

    return user;
  }

  async changePassword(
    email: User['email'],
    oldPassword: User['password'],
    newPassword: User['password'],
  ) {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Uncorrect email');

    if (oldPassword === newPassword)
      throw new BadRequestException('Passwords must not match');

    const oldPasswordIsValid = compareSync(oldPassword, user.password);
    if (!oldPasswordIsValid)
      throw new UnauthorizedException('Uncorrect old password');

    const newPasswordHash = this.getHash(newPassword);

    return await this.userRepository.updateOne(user.id, {
      password: newPasswordHash,
    });
  }
}
