import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';

import { Question, Quiz } from './quiz.schema';

import { CreateQuizInput } from './dto/create-quiz.input';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>) {}

  // private readonly checkQuestion: (question: typeof Question) => {
  //   question
  // }

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
