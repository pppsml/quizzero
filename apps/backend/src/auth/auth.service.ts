import { Injectable } from "@nestjs/common";
import { AllowedProviders } from "@repo/types";


import { ProvidersService } from "./providers/provides.service";
import { UserService } from "src/user/user.service";
import { AccountService } from "src/account/account.service";


@Injectable()
export class AuthService {
  constructor(
    private readonly providersService: ProvidersService,
    private readonly userService: UserService,
    private readonly accountService: AccountService,
  ) {}

  async extractUserByCode(code: string, provider: AllowedProviders) {
    const providerInstance = this.providersService.findService(provider)
    const profile = await providerInstance.getUserByCode(code)

    let account = await this.accountService.getByProvider(provider, profile.id)

    let user = account?.userId
      ? await this.userService.getById(account.userId)
      : (await this.userService.getByEmail(profile.email)) || null

    if (user && account) {
      return this.userService.updateOne(user._id, {
        name: profile.name,
        image: profile.avatarUrl,
      })
    }

    if (!user) {
      user = await this.userService.createUser({
        email: profile.email,
        password: null,
        name: profile.name,
      })
    }

    if (!account) {
      this.accountService.createOne({
        userId: user._id,
        type: 'oauth',
        provider,
        access_token: profile.access_token,
        refresh_token: profile.refresh_token,
        providerAccountId: profile.id,
        expires_at: new Date(Date.now() + profile.expires_at * 1000),
      })
    }

    return user
  }

  getAuthUri(provider: AllowedProviders) {
    return this.providersService.findService(provider).getAuthUri()
  }
}