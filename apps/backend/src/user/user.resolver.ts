import { ConfigService } from '@nestjs/config';
import { Resolver, Query, Args } from '@nestjs/graphql';

import { UserService } from './user.service';
import { User } from './user.schema';

import { ConfigServiceVariables } from '../config/configService.config';

@Resolver('user')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService<ConfigServiceVariables>,
  ) {}

  @Query(() => User, { nullable: true, })
  async getUserById(@Args('id') id: string) {
    return await this.userService.getById(id);
  }

  @Query(() => Boolean)
  async userWithEmailIsExists(@Args('email') email: string) {
    return !!await this.userService.getByEmail(email)
  }
}
