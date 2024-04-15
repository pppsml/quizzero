import { Field, InputType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { ISession } from "@repo/types";

import { GraphQLObjectId } from "src/types";

@InputType()
export class DeleteSessionDto {
  @Field(() => GraphQLObjectId, { nullable: true })
  _id?: ObjectId;

  @Field(() => String, { nullable: true })
  sid?: string;

  @Field(() => GraphQLObjectId, { nullable: true })
  userId?: ObjectId;
}