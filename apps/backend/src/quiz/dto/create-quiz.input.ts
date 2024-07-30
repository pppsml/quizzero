import { Field, InputType, Int } from '@nestjs/graphql';
import { Quiz, Question, AnswerOption } from '../quiz.schema';

@InputType()
class AnswerOptionInput implements AnswerOption {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  image: string | null;
}

@InputType()
class QuestionInput implements Question {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => [AnswerOptionInput])
  answerOptions: AnswerOptionInput[];

  @Field(() => Int)
  correct: number;

  image: string | null;
}

@InputType()
export class CreateQuizInput implements Partial<Quiz> {
  @Field(() => String)
  title: string;

  @Field(() => [QuestionInput])
  questions: QuestionInput[];

  image: string | null;
}
