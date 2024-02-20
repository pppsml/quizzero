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

import { User } from './user.schema'
import { CreateUserInput } from './dto/createUser.input';

import { MailerService } from 'src/mailer/mailer.service';

import { ConfigServiceVariables } from 'src/config/configService.config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<ConfigServiceVariables>,
  ) {}

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async createUser({ email, password, name }: CreateUserInput): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email,
    });

    if (existingUser) {
      throw new ConflictException(
        `User with email "${email}" already exists`,
      );
    }

    const user = await this.userModel.create({
      email,
      name,
      displayName: name || email,
      password,
    });
    // const verificationCode = await this.verificationCodeService.createOne(
    //   user.id,
    // );

    // const hashedVerificationCode = this.getHash(
    //   `${verificationCode}_${createUserInput.email}`,
    // );

    // const url = `${this.configService.get('FRONTEND_ENDPOIND_VERIFY')}?email=${
    //   createUserInput.email
    // }&token=${hashedVerificationCode}`;

    // this.mailerService.sendConfirmationMail({
    //   email: createUserInput.email,
    //   url,
    // });

    return user;
  }

  async login(email: User['email'], password: User['password']) {
    const user = await this.userModel.findOne({ email })
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

    await this.userModel.updateOne({ _id: user._id }, {
      password: newPasswordHash,
    })

    return true
  }

  // async verifyUser(email: User['email'], token: string): Promise<boolean> {
  //   const user = await this.userRepository.findOneByEmail(email);
  //   if (!user) {
  //     throw new UnauthorizedException(
  //       `User with email "${email}" does not exists`,
  //     );
  //   }

  //   if (user.isVerified) {
  //     throw new ConflictException(
  //       'User already verified'
  //     )
  //   }

  //   const verificationCode = await this.verificationCodeService.findOneByUserId(
  //     user.id,
  //   );
  //   // todo check on token expire time
  //   const tokenIsValid = compareSync(
  //     `${verificationCode}_${user.email}`,
  //     token,
  //   );

  //   if (!tokenIsValid) return false

  //   await this.userRepository.updateOne(user.id, {
  //     isVerified: true,
  //   })

  //   await this.verificationCodeService.deleteOneById(verificationCode.id)

  //   return true;
  // }
}
