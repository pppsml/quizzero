import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

import { QuizService } from './quiz.service';
import { Quiz } from './quiz.schema';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UserService } from 'src/user/user.service';

import { IContext } from 'src/types/context';

@Resolver()
export class QuizResolver {
  constructor(
    private readonly quizService: QuizService,
    private readonly userService: UserService
  ) {}
  
  @Query(() => Quiz)
  getQuizById(
    @Args('quizId') quizId: string
  ): Promise<Quiz> {
    return this.quizService.getOneById(quizId)
  }

  // todo filters
  @Query(() => [Quiz])
  getAllQuizzes(): Promise<Quiz[]> {
    return this.quizService.getAll()
  }


  @Mutation(() => Quiz)
  async createQuiz(
    @Args('createQuizInput') createQuizInput: CreateQuizInput,
    @Context('user') sessionUser: IContext['user'],
  ) {
    if (!sessionUser) throw new UnauthorizedException('You must log in')

    const user = await this.userService.getById(sessionUser._id)
    if (!user) throw new ConflictException('User does not exists')

    return await this.quizService.createQuiz(createQuizInput, user._id);
  }

}
