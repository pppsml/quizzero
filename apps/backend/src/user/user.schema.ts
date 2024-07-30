import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IUser, UserRoles } from '@repo/types'

import { GraphQLObjectId } from "src/types/scalars/gqlObjectId";

@ObjectType()
@Schema({
  timestamps: true,
})
export class User implements IUser {
  @Field(() => GraphQLObjectId)
  _id: string;

  @Field(() => String)
  @Prop({ type: () => String, unique: true, index: 1, })
  email: string;

  @Prop({ type: () => String })
  password: string;
  
  @Field(() => String)
  @Prop({ type: () => String })
  name: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: () => String })
  image: string | null;

  @Field(() => [String])
  @Prop({ type: [String], enum: UserRoles, default: [UserRoles.USER] })
  roles: UserRoles;

  @Field(() => Date)
  createdAt: Date;

  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User)