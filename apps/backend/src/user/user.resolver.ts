import { Inject } from "@nestjs/common";
import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";

import { UserService } from "./user.service";
import { User } from "./user.schema";

@Resolver('user')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async getUserHello() {
    return 'Hello from UserResolver'
  }

  @Mutation(() => User)
  async getUserById(@Args('id') id: string) {
    return await this.userService.getUserById(id);
  }
}