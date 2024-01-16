import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Quiz } from '@repo/database/dist';

import { QuizService } from './quiz.service';
import { GqlQuiz } from './quiz.schema';
import { CreateQuizInput } from './dto/create-quiz.input';
import { IContext } from 'src/types/context';
import { UnauthorizedException } from '@nestjs/common';

@Resolver()
export class QuizResolver {
  constructor(private readonly quizService: QuizService) {}
  
  @Query(() => GqlQuiz)
  async getQuizById(
    @Args('quizId') quizId: string
  ) {
    return await this.quizService.findOneById(quizId)
  }


  @Mutation(() => GqlQuiz)
  async createQuiz(
    @Args('createQuizInput') createQuizInput: CreateQuizInput,
    @Context('user') user: IContext['user'],
  ) {
    if (!user) throw new UnauthorizedException('You must log in')
    return await this.quizService.createQuiz(createQuizInput, user.id);
  }

}
