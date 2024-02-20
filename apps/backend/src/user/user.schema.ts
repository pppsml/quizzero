import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { IUser } from '@repo/types'

import { GraphQLObjectId } from "src/types/scalars/gqlObjectId";

@ObjectType()
@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class User implements IUser {
  @Field(() => GraphQLObjectId)
  _id: string;

  @Field(() => String)
  @Prop({ type: () => String, index: 1 })
  email: string;

  @Prop({ type: () => String })
  password: string;
  
  @Field(() => String)
  @Prop({ type: () => String })
  name: string;
  
  @Field(() => String)
  @Prop({ type: () => String })
  displayName: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User)