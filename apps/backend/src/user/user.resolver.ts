import { InternalServerErrorException } from "@nestjs/common";
import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { Request } from "express";

import { UserService } from "./user.service";
import { GqlUser } from "./user.schema";
import { CreateUserInput } from "./dto/createUser.input";
import { IContext } from "src/types/context";

@Resolver('user')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => GqlUser, { nullable: true })
  async me(@Context('user') user: IContext['user']) {
    if (!user) return null
    const mongoUser = await this.userService.getUserById(user.id)
    return mongoUser;
  }

  @Query(() => String)
  async getUserHello() {
    return 'Hello from UserResolver';
  }

  @Mutation(() => GqlUser)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.createUser(createUserInput);
  }

  @Mutation(() => GqlUser)
  async getUserById(@Args('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Mutation(() => GqlUser)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context('req') req: IContext['req'],
  ) {
    const user = await this.userService.login(email, password);

    req.session.user = {
      id: user.id,
    };

    req.session.save()

    return user;
  }

  @Mutation(() => Boolean)
  async logout(@Context('req') req: Request) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(new InternalServerErrorException(err.message));
      });

      resolve(true);
    });
  }

  @Mutation(() => GqlUser)
  async changePassword(
    @Args('email') email: string,
    @Args('oldPassword') oldPassword: string,
    @Args('newPassword') newPassword: string,
  ): Promise<GqlUser> {
    return await this.userService.changePassword(email, oldPassword, newPassword);
  }
}