import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { Request } from 'express';

import { UserService } from './user.service';
import { User } from './user.schema';
import { CreateUserInput } from './dto/create-user.dto';

import { IContext } from '../types';
import { ConfigServiceVariables } from '../config/configService.config';

@Resolver('user')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService<ConfigServiceVariables>,
  ) {}

  // @Query(() => User, { nullable: true })
  // async me(@Context('user') sessionUser: IContext['user']) {
  //   if (!sessionUser) return null;
  //   const user = await this.userService.getUserById(sessionUser._id);
  //   return user;
  // }

  @Query(() => User, { nullable: true, })
  async getUserById(@Args('id') id: string) {
    return await this.userService.getById(id);
  }

  // @Query(() => Boolean)
  // async getVerificationEmail(@Args('email') email: string) {
  //   const { code } = await this.verificationCodeService.createOne(email)
  //   return await this.mailerService.sendConfirmationMail(email, code);
  // }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.createUser(createUserInput);
  }

  // @Mutation(() => User)
  // async login(
  //   @Args('email') email: string,
  //   @Args('password') password: string,
  //   @Context('req') req: IContext['req'],
  // ) {
  //   const user = await this.userService.login(email, password);

  //   req.session.user = {
  //     _id: user._id,
  //   };

  //   console.log(req.sessionID);

  //   // console.log(await this.userActiveSessionService.createOne(req.sessionID, user.id))

  //   return user;
  // }

  // @Mutation(() => Boolean)
  // async logout(@Context('req') req: Request) {
  //   return new Promise((resolve, reject) => {
  //     req.session.destroy((err) => {
  //       if (err) reject(new InternalServerErrorException(err.message));
  //     });

  //     resolve(true);
  //   });
  // }

  // @Mutation(() => Boolean)
  // async changePassword(
  //   @Args('email') email: string,
  //   @Args('oldPassword') oldPassword: string,
  //   @Args('newPassword') newPassword: string,
  // ): Promise<boolean> {
  //   return await this.userService.changePassword(
  //     email,
  //     oldPassword,
  //     newPassword,
  //   );
  // }

  // @Mutation(() => Boolean)
  // async verifyUser(
  //   @Args('email') email: string,
  //   @Args('code') code: string,
  // ) {
  //   return await this.verificationCodeService.verify(email, code)
  // }
}
