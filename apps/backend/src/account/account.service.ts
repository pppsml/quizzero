import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AllowedProviders } from "@repo/types";

import { Account } from "./account.schema";


@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>
  ) {}

  async createOne(data: Omit<Account, '_id' | 'createdAt' | 'updatedAt'>) {
    return this.accountModel.create(data)
  }

  async getByProvider(provider: AllowedProviders, providerId: string) {
    return this.accountModel.findOne({
      provider,
      providerAccountId: providerId,
    })
  }

  async getAllByUserId(userId: string) {
    return this.accountModel.find({
      userId,
    })
  }

  async getByProviderAndUserId(userId: string, provider: AllowedProviders) {
    return this.accountModel.findOne({
      userId,
      provider,
    })
  }
}