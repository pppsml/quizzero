import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

import { Quiz, Question, AnswerOption } from '@repo/database/dist';
import { GqlUser } from 'src/user/user.schema';


@ObjectType()
export class GqlAnswerOption implements AnswerOption {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;
}

@ObjectType()
export class GqlQuestion implements Question {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => [GqlAnswerOption])
  answerOptions: GqlAnswerOption[]

  @Field(() => Int)
  correct: number;
}

@ObjectType()
export class GqlQuiz implements Partial<Quiz> {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => [GqlQuestion])
  questions: GqlQuestion[];

  @Field(() => GqlUser)
  createdBy: GqlUser;

  @Field(() => Date)
  createdAt: Date;
}