import { Field, ObjectType } from "@nestjs/graphql";
import { User as UserType } from "@repo/database";

@ObjectType()
export class User implements Omit<UserType, 'password'> {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  displayName: string;

  @Field(() => Boolean)
  isVerified: boolean;

  @Field(() => Date)
  createdAt: Date;
}