import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQuestion } from '@repo/types';

import { Quiz } from './quiz.schema';

import { CreateQuizInput } from './dto/create-quiz.input';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>) {}

  private validateQuestions(questions: IQuestion[]): boolean {
    if (questions.length === 0) {
      throw new BadRequestException("Quiz must have al least 1 question")
    }

    return true
  }

  async createQuiz({ title, questions }: CreateQuizInput, userId: any): Promise<Quiz> {
    const quiz = await this.quizModel.create({
      title,
      questions,
      createdBy: userId,
    })

    return quiz.populate('createdBy')
  }

  async findOneById(id: string): Promise<Quiz> {
    return this.quizModel.findById(id)
  }
}
