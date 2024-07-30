import { Field, Int, ObjectType } from '@nestjs/graphql'
import { IAnswerOption, IQuestion, IQuiz } from '@repo/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose'

import { User } from 'src/user/user.schema';

import { GraphQLObjectId } from 'src/types/scalars/gqlObjectId';


@ObjectType()
export class AnswerOption implements IAnswerOption {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  image: string | null;

  @Field(() => String)
  text: string;
}

@ObjectType()
export class Question implements IQuestion {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  image: string | null;

  @Field(() => String)
  text: string;

  @Field(() => [AnswerOption])
  answerOptions: AnswerOption[]

  @Field(() => Int)
  correct: number;
}

@ObjectType()
@Schema({ timestamps: true })
export class Quiz implements IQuiz {
  @Field(() => GraphQLObjectId)
  _id: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: () => String, default: null })
  image: string | null;

  @Field(() => String)
  @Prop({ type: () => String, required: true, })
  title: string;
  
  @Field(() => [Question])
  @Prop({ type: () => [Question], required: true, })
  questions: Question[];

  @Field(() => User)
  @Prop({ type: () => Types.ObjectId, ref: () => User })
  createdBy: User;

  @Field(() => Date)
  createdAt: Date;
  
  @Field(() => Date)
  updatedAt: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz)