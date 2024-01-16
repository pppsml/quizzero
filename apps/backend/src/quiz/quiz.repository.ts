import { Injectable } from '@nestjs/common';
import { Quiz, User } from '@repo/database';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizInput } from './dto/create-quiz.input';

export interface QuizRepositoryInterface {
  createOne: (createQuizInput: CreateQuizInput, userId: User['id']) => Promise<Quiz>;

  findOneById: (quizId: Quiz['id']) => Promise<Quiz>
}

export const QuizRepositorySymbol = Symbol();

@Injectable()
export class PrismaQuizRepository implements QuizRepositoryInterface {
  constructor(private prismaService: PrismaService) {}

  async createOne(
    { title, questions }: CreateQuizInput,
    userId: User['id'],
  ): Promise<Quiz> {
    return await this.prismaService.quiz.create({
      data: {
        title,
        questions,
        userId: userId,
      },
      include: {
        createdBy: true,
      }
    });
  }

  async findOneById(id: Quiz['id']): Promise<Quiz> {
    return await this.prismaService.quiz.findUnique({
      where: { id: id },
      include: {
        createdBy: true,
      }
    })
  }
}
