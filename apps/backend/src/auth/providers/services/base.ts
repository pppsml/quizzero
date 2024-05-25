import { BadRequestException, Injectable } from "@nestjs/common";

import { BaseProviderOptsType } from "./types/baseProviderOpts.type";
import { BaseUserInfoType } from "./types/baseUserInfo.type";


@Injectable()
export class BaseService {
  private _baseUri: string

  constructor(
    private readonly opts: BaseProviderOptsType,
  ) {}

  protected async extractUserInfo(data: any): Promise<BaseUserInfoType> {
    return {
      ...data,
      provider: this.opts.name,
    }
  }


  getAuthUri() {
    const query = new URLSearchParams({
      response_type: 'code',
      client_id: this.opts.client_id,
      redirect_uri: this.getRedirectUri(),
      scope: (this.opts.scopes || []).join(' '),
      access_type: 'offline',
      prompt: 'select_account',
    })

    return `${this.opts.authorize_uri}?${query.toString()}`
  }

  async getUserByCode(code: string): Promise<BaseUserInfoType> {
    const client_id = this.opts.client_id
    const client_secret = this.opts.client_secret

    const tokensQuery = new URLSearchParams({
      client_id,
      client_secret,
      code,
      redirect_uri: this.getRedirectUri(),
      grant_type: 'authorization_code'
    })

    const tokensRequest = await fetch(this.access_uri, {
      method: 'POST',
      body: tokensQuery,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }
    })

    if (!tokensRequest.ok) {
      throw new BadRequestException(
        `Failed to fetch tokens from ${this.opts.access_uri}`,
        {
          cause: tokensRequest.text(),
        }
      )
    }

    const tokens = await tokensRequest.json()

    if (!tokens.access_token) {
      throw new BadRequestException(
        `Failed to fetch tokens from ${this.opts.access_uri}`,
        {
          cause: tokens,
        }
      )
    }

    const userRequest = await fetch(`${this.profile_uri}?access_token=${tokens.access_token}`)

    if (!userRequest.ok) {
      throw new BadRequestException(
        `Failed to fetch user from ${this.opts.profile_uri}`,
        {
          cause: userRequest.text(),
        }
      )
    }

    const user = await userRequest.json()
    const userData = await this.extractUserInfo(user)

    return {
      ...userData,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: tokens.expires_at || tokens.expires_in,
      provider: this.opts.name,
    }
  }

  getRedirectUri() {
    return `${this._baseUri}${this.opts.name}`;
  }

  set baseUri(value: string) {
    this._baseUri = value;
  }

  get name() {
    return this.opts.name;
  }

  get access_uri() {
    return this.opts.access_uri;
  }

  get profile_uri() {
    return this.opts.profile_uri;
  }

  get scopes() {
    return this.opts.scopes;
  }
}