import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compareSync, hashSync } from 'bcrypt';
import { User } from '@repo/database';

import { PrismaUserRepository, UserRepositorySymbol } from './user.repository';
import { VerificationCodeService } from 'src/verificationCode/verificationCode.service';
import { MailerService } from 'src/mailer/mailer.service';

import { CreateUserInput } from './dto/createUser.input';
import { ConfigServiceVariables } from 'src/config/configService.config';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly userRepository: PrismaUserRepository,

    private readonly mailerService: MailerService,

    private readonly verificationCodeService: VerificationCodeService,

    private readonly configService: ConfigService<ConfigServiceVariables>,
  ) {}

  private readonly saltRounds = 10;

  private getHash(data: string) {
    return hashSync(data, this.saltRounds);
  }

  async getUserById(id: User['id']): Promise<User> {
    return await this.userRepository.findOneById(id);
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const existingUser = await this.userRepository.findOneByEmail(
      createUserInput.email,
    );

    if (existingUser) {
      throw new ConflictException(
        `User with email "${createUserInput.email}" already exists`,
      );
    }

    const hashedPass = this.getHash(createUserInput.password);
    createUserInput.password = hashedPass;

    const user = await this.userRepository.createOne(createUserInput);
    const verificationCode = await this.verificationCodeService.createOne(
      user.id,
    );

    const hashedVerificationCode = this.getHash(
      `${verificationCode}_${createUserInput.email}`,
    );

    const url = `${this.configService.get('FRONTEND_ENDPOIND_VERIFY')}?email=${
      createUserInput.email
    }&token=${hashedVerificationCode}`;

    this.mailerService.sendConfirmationMail({
      email: createUserInput.email,
      url,
    });

    return user;
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

    if (oldPassword === newPassword) {
      throw new BadRequestException('Passwords must not match');
    }

    const oldPasswordIsValid = compareSync(oldPassword, user.password);
    if (!oldPasswordIsValid) {
      throw new UnauthorizedException('Uncorrect old password');
    }

    const newPasswordHash = this.getHash(newPassword);

    return await this.userRepository.updateOne(user.id, {
      password: newPasswordHash,
    });
  }

  async verifyUser(email: User['email'], token: string): Promise<boolean> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        `User with email "${email}" does not exists`,
      );
    }

    if (user.isVerified) {
      throw new ConflictException(
        'User already verified'
      )
    }

    const verificationCode = await this.verificationCodeService.findOneByUserId(
      user.id,
    );
    // todo check on token expire time
    const tokenIsValid = compareSync(
      `${verificationCode}_${user.email}`,
      token,
    );

    if (!tokenIsValid) return false

    await this.userRepository.updateOne(user.id, {
      isVerified: true,
    })

    await this.verificationCodeService.deleteOneById(verificationCode.id)

    return true;
  }
}
