export const CODE_LENGTH: number = 8

export interface IVerificationCode {
  _id: string;
  code: string;
  email: string;
  type: VerificationCodeTypes;
  createdAt: Date;
}

export enum VerificationCodeTypes {
  EMAIL = 'EMAIL',
  PASSWORD_RESET = 'PASSWORD_RESET',
}