import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { QuizResolver } from './quiz.resolver';
import { QuizService } from './quiz.service';
import { Quiz, QuizSchema } from './quiz.schema';

import { UserModule } from 'src/user/user.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    UserModule,
    FileModule,
  ],
  providers: [
    QuizResolver,
    QuizService,
  ],
})
export class QuizModule {}
