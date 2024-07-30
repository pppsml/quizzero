import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { AllowedProviders, IAccount } from "@repo/types";

import { User } from "src/user/user.schema";

@Schema({
  timestamps: true,
})
export class Account implements IAccount {
  _id: string
  
  @Prop({ type: () => Types.ObjectId, ref: () => User })
  userId: string
  
  @Prop({ type: () => String, })
  access_token: string;

  @Prop({ type: () => String, })
  refresh_token: string;

  @Prop({ type: () => String, enum: AllowedProviders })
  provider: AllowedProviders;

  @Prop({ type: () => String, })
  providerAccountId: string;
  
  @Prop({ type: () => String, })
  type: string;

  @Prop({ type: () => Date, })
  createdAt: Date;

  @Prop({ type: () => Date, })
  updatedAt: Date;

  @Prop({ type: () => Date, })
  expires_at: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account)