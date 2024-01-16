import { Inject, Injectable } from '@nestjs/common';
import { Quiz, User } from '@repo/database';

import { PrismaQuizRepository, QuizRepositorySymbol } from './quiz.repository';
import { CreateQuizInput } from './dto/create-quiz.input';

@Injectable()
export class QuizService {
  constructor(@Inject(QuizRepositorySymbol) private readonly quizRepository: PrismaQuizRepository) {}

  async createQuiz(createQuizInput: CreateQuizInput, userId: User['id']): Promise<Quiz> {
    return await this.quizRepository.createOne(createQuizInput, userId)
  }

  async findOneById(id: Quiz['id']): Promise<Quiz> {
    return await this.quizRepository.findOneById(id)
  }
}
