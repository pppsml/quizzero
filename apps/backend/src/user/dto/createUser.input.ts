import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsStrongPassword, MinLength } from 'class-validator'


@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String)
  @MinLength(8)
  password: string;
}