import { Field, ObjectType } from "@nestjs/graphql";

import { GraphQLObjectId } from "src/types";
import { User } from "src/user/user.schema";

@ObjectType()
export class ReturnAnswerOptionDto {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => String, { nullable: true })
  image: string | null;
}

@ObjectType()
export class ReturnQuestionDto {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => String, { nullable: true })
  image: string | null;

  @Field(() => [ReturnAnswerOptionDto])
  answerOptions: ReturnAnswerOptionDto[];
}

@ObjectType()
export class ReturnQuizDto {
  @Field(() => GraphQLObjectId)
  _id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  image: string | null;

  @Field(() => [ReturnQuestionDto])
  questions: ReturnQuestionDto[];

  @Field(() => User)
  createdBy: User;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}