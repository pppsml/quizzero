import { Module } from '@nestjs/common';

import { QuizResolver } from './quiz.resolver';
import { QuizService } from './quiz.service';
import { PrismaQuizRepository, QuizRepositorySymbol } from './quiz.repository';

@Module({
  providers: [
    QuizResolver,
    QuizService,
    {
      provide: QuizRepositorySymbol,
      useClass: PrismaQuizRepository
    }
  ],
})
export class QuizModule {}
