import { Field, InputType, Int } from '@nestjs/graphql';
import { GqlQuiz, GqlQuestion, GqlAnswerOption } from '../quiz.schema';

@InputType()
class AnswerOptionInput implements GqlAnswerOption {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;
}

@InputType()
class QuestionInput implements GqlQuestion {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => [AnswerOptionInput])
  answerOptions: AnswerOptionInput[];

  @Field(() => Int)
  correct: number;
}

@InputType()
export class CreateQuizInput implements Partial<GqlQuiz> {
  @Field(() => String)
  title: string;

  @Field(() => [QuestionInput])
  questions: QuestionInput[];
}
