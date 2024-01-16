import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "@repo/database";

@ObjectType()
export class GqlUser implements Omit<User, 'password'> {
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