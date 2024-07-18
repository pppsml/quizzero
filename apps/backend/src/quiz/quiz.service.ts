import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
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

  getOneById(id: string): Promise<Quiz> {
    return this.quizModel.findById(id)
  }

  async getAll(): Promise<Quiz[]> {
    const pipeline: PipelineStage[] = [
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'createdBy',
        }
      },
      {
        $addFields: {
          createdBy: { $arrayElemAt: ['$createdBy', 0] }
        }
      }
    ]

    try {
      return this.quizModel.aggregate(pipeline)
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
