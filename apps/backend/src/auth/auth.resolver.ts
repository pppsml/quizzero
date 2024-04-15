import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";

import { MailerService } from "src/mailer/mailer.service";
import { SessionService, DeleteSessionDto } from "src/session";
import { User, CreateUserInput, UserService } from "src/user"

import { ProvidersService } from "./providers/provides.service";

import { IContext } from "src/types";


@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
    private readonly sessionService: SessionService,
    private readonly providersService: ProvidersService,
  ) {}

  // TODO
  // getMe + touch session +
  // registration +
  // login + session create +
  // logout + session delete +
  // verification code
  //

  @Query(() => User, { nullable: true })
  async getMe(
    @Context() context: IContext
  ) {
    const userId = context.user && context.user._id
    if (!userId) return null
    const reqSession = context.req.session

    const user = await this.userService.getUserById(userId)

    const mongoSession = await this.sessionService.touch(reqSession.id, reqSession)

    if (!mongoSession) {
      //? fix
      reqSession.destroy((err) => console.log(err))
      return null
    }

    return user
  }

  @Query(() => String, {})
  async getAuthUri(
    @Args('provider') provider: string,
  ) {
    return this.providersService.findService(provider).getAuthUri()
  }

  @Mutation(() => Boolean)
  async deleteSession(@Args('DeleteSessionDto') deleteSessionDto: DeleteSessionDto) {
    return this.sessionService.deleteOne(deleteSessionDto)
  }

  @Mutation(() => User)
  async registration(@Args('createUserInput') input: CreateUserInput): Promise<User> {
    return await this.userService.createUser(input)
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: IContext
  ): Promise<User | null> {
    try {
      const user = await this.userService.login(email, password)
      const session = context.req.session

      if (session.user) return user
      
      session.user = { _id: user._id }

      const data = JSON.stringify(session)
  
      await this.sessionService.createOne({
        sid: session.id,
        userId: user._id,
        data,
        expiresAt: session.cookie.expires || null
      })
  
      return user
    } catch (error) {
      console.log(error)
      return null
    }
  }

  @Mutation(() => Boolean)
  async logout(@Context() context: IContext) {
    if (!context.user) return true

    const reqSession = context.req.session

    await this.sessionService.deleteOne({ sid: reqSession.id })
    reqSession.destroy(() => {})
    return true
  }
}