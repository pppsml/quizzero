import { IUser } from "../user";

export interface IAnswerOption {
  id: number;
  text: string;
}

export interface IQuestion {
  id: number;
  text: string;
  answerOptions: IAnswerOption[];
  correct: number;
}

export interface IQuiz {
  _id: string;
  title: string;
  questions: IQuestion[];
  createdBy: IUser;
  createdAt: Date;
  updatedAt: Date;
}
