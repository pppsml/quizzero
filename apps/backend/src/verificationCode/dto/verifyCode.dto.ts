import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { IsEmail, Length } from "class-validator";
import { VerificationCodeTypes, CODE_LENGTH } from "@repo/types";


registerEnumType(VerificationCodeTypes, {
  name: 'VerificationCodeType',
})

@InputType()
export class VerifyCodeInput {
  @Field(() => String)
  @Length(CODE_LENGTH, CODE_LENGTH)
  code: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => VerificationCodeTypes)
  type: VerificationCodeTypes;
}