import { IUser } from "../user";

export interface IAnswerOption {
  id: number;
  image: string | null;
  text: string;
}

export interface IQuestion {
  id: number;
  image: string | null;
  text: string;
  answerOptions: IAnswerOption[];
  correct: number;
}

export interface IQuiz {
  _id: string;
  image: string | null;
  title: string;
  questions: IQuestion[];
  createdBy: IUser;
  createdAt: Date;
  updatedAt: Date;
}
