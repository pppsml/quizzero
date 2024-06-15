import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compareSync, hashSync } from 'bcrypt';

import { User } from './user.schema';
import { CreateUserInput } from './dto/create-user.dto';

import { ConfigServiceVariables } from 'src/config/configService.config';
import { LoginInput } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly configService: ConfigService<ConfigServiceVariables>,
  ) {}

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async getByEmail(email: string) {
    return this.userModel.findOne({
      email,
    });
  }

  async createUser({ email, password, name, image }: CreateUserInput): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email,
    });

    if (existingUser) {
      throw new ConflictException(`User with email "${email}" already exists`);
    }

    const user = await this.userModel.create({
      email,
      name: name || email,
      password,
      image,
    });

    return user;
  }

  async login({ email, password }: LoginInput) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Uncorrect email');

    const passIsValid = compareSync(password, user.password);
    if (!passIsValid) throw new UnauthorizedException('Uncorrect password');

    return user;
  }

  async changePassword(
    email: User['email'],
    oldPassword: User['password'],
    newPassword: User['password'],
  ): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Uncorrect email');

    if (oldPassword === newPassword) {
      throw new BadRequestException('Passwords must not match');
    }

    const oldPasswordIsValid = compareSync(oldPassword, user.password);
    if (!oldPasswordIsValid) {
      throw new UnauthorizedException('Uncorrect old password');
    }

    const newPasswordHash = hashSync(newPassword, 10);

    await this.userModel.updateOne(
      { _id: user._id },
      {
        password: newPasswordHash,
      },
    );

    return true;
  }

  async updateOne(userId: string, data: Partial<Pick<User, 'image' | 'name'>>) {
    return this.userModel.findOneAndUpdate(
      {
        _id: userId,
      },
      data,
    );
  }
}
