import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AllowedProviders, VerificationCodeTypes } from "@repo/types";

import { MailerService } from "src/mailer/mailer.service";
import { SessionService } from "src/session/session.service";
import { User } from "src/user/user.schema"
import { UserService } from "src/user/user.service"
import { VerificationCodeService } from "src/verificationCode/verificationCode.service";

import { AuthService } from "./auth.service";

import { IContext } from "src/types";
import { CreateUserInput } from "src/user/dto/create-user.dto"
import { LoginInput } from "../user/dto/login.dto";
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";


@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
    private readonly verificationCodeService: VerificationCodeService,
    private readonly sessionService: SessionService,
  ) {}

  @Query(() => User, { nullable: true })
  async getMe(
    @Context() context: IContext
  ) {
    const userId = context.user && context.user._id
    if (!userId) return null
    const reqSession = context.req.session

    const user = await this.userService.getById(userId)

    const mongoSession = await this.sessionService.touch(reqSession.id, reqSession)

    if (!mongoSession) {
      reqSession.destroy((err) => console.log(err))
      return null
    }

    return user
  }

  @Query(() => String)
  async getAuthUri(
    @Args('provider') provider: AllowedProviders,
  ) {
    return this.authService.getAuthUri(provider)
  }

  @Query(() => User, { nullable: true })
  async providerCallback(
    @Args('code') code: string,
    @Args('provider') provider: AllowedProviders, 
    @Context() context: IContext,
  ) {
    const user = await this.authService.extractUserByCode(code, provider)

    await this.sessionService.createOne({
      sid: context.req.sessionID,
      userId: user._id,
      expiresAt: context.req.session.cookie.expires,
      data: user,
    })

    context.req.session.save()

    return user
  }

  @Query(() => Boolean)
  async getEmailConfirmationMail(@Args('email') email: string) {
    const code = await this.verificationCodeService.createOne(email, VerificationCodeTypes.EMAIL)

    return this.mailerService.sendConfirmationMail(email, code.code)
  }

  @Mutation(() => User)
  async registerUser(@Args('createUserInput') input: CreateUserInput): Promise<User> {
    return await this.userService.createUser(input)
  }


  @Mutation(() => User)
  async login(
    @Args('loginInput') input: LoginInput,
    @Context() context: IContext
  ): Promise<User> {
    try {
      const session = context.req.session
      if (session.user) {
        return this.userService.getById(session.user._id)
      }
      
      const user = await this.userService.login(input)
      
      if (!input.rememberMe) return user

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
      return error
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