import { IUser } from "../user";

export interface IVerificationCode {
  _id: string;
  code: string;
  email: string;
  createdAt: Date;
}